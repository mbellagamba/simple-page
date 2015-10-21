var fs = require('fs');
var shotsDir = 'shots/';
var PNG = require('pngjs2').PNG;
var PNGCrop = require('./pngcrop');
var minSize = {};

var shotsResize = function (size) {
  var files = fs.readdirSync(shotsDir);
  files = files.filter(function (file) {
    if (file.indexOf('.png', this.length - 4) !== -1) {
      return file;
    }
  });
  files.forEach(function (file) {
    var cropOptions = {width: size.width, height: size.height, top: 0, left: 0};
    // pass a path, a buffer or a stream as the input
    PNGCrop.crop(shotsDir + file, shotsDir + file, cropOptions, function (err) {
      if (err) throw err;
    });
  });
};

(function () {
  var files = fs.readdirSync(shotsDir);
  files = files.filter(function (file) {
    if (file.indexOf('.png', this.length - 4) !== -1) {
      return file;
    }
  });

  files.forEach(function (file, index) {
    fs.createReadStream(shotsDir + file)
      .pipe(new PNG({
        filterType: 4
      }))
      .on('parsed', function hasMinSize() {
        if (!minSize.width || this.width < minSize.width) {
          minSize.width = this.width;
        }
        if (!minSize.height || this.height < minSize.height) {
          minSize.height = this.height;
        }
        if (index === files.length - 1) {
          // Last iteration
          shotsResize(minSize);
        }
      });
  });

}) ();
