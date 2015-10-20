describe('Screen shots', function () {

  var PNG = require('pngjs2').PNG;
  var pixelmatch = require('pixelmatch');
  var fs = require('fs');
  var resemble = require('node-resemble-js');
  var shotsDir = 'shots/';
  var comparisonDir = shotsDir + 'comparisons/';
  var referenceShot = 'OS X 10.10chrome.png';
  var files;

  beforeEach(function () {
    files = fs.readdirSync(shotsDir);
    files = files.filter(function (file) {
      if (file.indexOf('.png') === file.length - 4 && file !== referenceShot) {
        return file;
      }
    })
  });


  it('should be the same across browsers', function (done) {
    files.forEach(function (file, index) {
      resemble(shotsDir + referenceShot).compareTo(shotsDir + file).ignoreColors().onComplete(function (data) {
        data.getDiffImage().pack().pipe(fs.createWriteStream(comparisonDir + 'resemble' + file)).on('finish', function () {
          expect(data.misMatchPercentage).toBeLessThan(20);
          if (index === files.length - 1) done();
        });
      });
    });

  });

  it('pixelmatch', function (done) {
    var img1 = fs.createReadStream(shotsDir + referenceShot).pipe(new PNG()).on('parsed', function() {

      files.forEach(function(file, index){
        var img2 = fs.createReadStream(shotsDir + file).pipe(new PNG()).on('parsed', function doneReading() {
          if (!img1.data || !img2.data) return;

          var threshold = 0.005;
          var antiAliasing = true;

          // Represents the difference between the compared screenshots
          var differenceImage = new PNG({width: this.width, height: this.height});
          // Number of different pixels
          var differentPixels = pixelmatch(img1.data, this.data, differenceImage.data, this.width, this.height, threshold, antiAliasing);

          differenceImage.pack().pipe(fs.createWriteStream(comparisonDir + 'pixelmatch' + file)).on('finish', function () {
            // Error in percentage
            var error = Math.round(100 * 100 * differentPixels / (differenceImage.width * differenceImage.height)) / 100;
            expect(error).toBeLessThan(20);
            if (index === files.length - 1) done();
          });

        });

      });
    });
  });


});
