var webdriverio = require('webdriverio');
var PNGCrop = require('png-crop');
var fs = require('fs');
var shotsDir = 'shots/';
var desiredCapabilities = require('./desiredCapabilities.json').desiredCapabilities;

desiredCapabilities.forEach(function (cap, index) {
  var browser = webdriverio.remote({
    desiredCapabilities: cap,
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    logLevel: 'silent'
  });
  var browserName = browser.desiredCapabilities.browserName;
  var screenshotPath = shotsDir + browserName + 'Temp.png';
  var size, location;

  browser
    .init()
    .url('file:///' + __dirname.replace('test/e2e', '') + '/index.html')
    .saveScreenshot(screenshotPath)
    .getElementSize('#content')
    .then(function (elementSize) {
      size = elementSize;
    })
    .getLocation('#content')
    .then(function (elementLocation) {
      location = elementLocation;
    })
    .call(function () {

      var cropOptions = {width: size.width, height: size.height, top: location.top, left: location.left};
      // pass a path, a buffer or a stream as the input
      PNGCrop.crop(screenshotPath, shotsDir + browserName + '.png', cropOptions, function (err) {
        if (err) throw err;
        fs.unlinkSync(screenshotPath);
      });

    })
    .end();
});
