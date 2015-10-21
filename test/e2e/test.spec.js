describe('Screen shots', function () {

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

});
