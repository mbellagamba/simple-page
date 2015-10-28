var webdriverio = require('webdriverio');
var PNGCrop = require('./pngcrop');
var fs = require('fs');
var shotsDir = 'shots/';
var desiredCapabilities;
if (process.env.SAUCE_USERNAME) {
  desiredCapabilities = require('./desiredCapabilities.json').desiredCapabilities;
} else {
  desiredCapabilities = [
    {
      platform: "OS X 10.10",
      browserName: "firefox"
    },
    {
      platform: "OS X 10.10",
      browserName: "chrome"
    }
  ];
}

desiredCapabilities.forEach(function (cap) {
  var conf;
  if (process.env.SAUCE_USERNAME) {
    cap.name = 'Screen shot test';
    cap['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
    cap.build = process.env.TRAVIS_BUILD_NUMBER;
    conf = {
      desiredCapabilities: cap,
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      logLevel: 'silent'
    };
  } else {
    conf = {desiredCapabilities: cap};
  }
  var browser = webdriverio.remote(conf);
  var browserName = browser.desiredCapabilities.browserName;
  var platform = browser.desiredCapabilities.platform;
  var screenshotPath = shotsDir + platform + browserName + 'Temp.png';
  var size, location;

  browser
    .init()
    .url('http://localhost:1337')
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

      var cropOptions = {width: size.width, height: size.height, top: location.y, left: location.x};
      // pass a path, a buffer or a stream as the input
      PNGCrop.crop(screenshotPath, shotsDir + platform + browserName + '.png', cropOptions, function (err) {
        if (err) throw err;
        fs.unlinkSync(screenshotPath);
      });

    })
    .end();
});
