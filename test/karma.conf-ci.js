module.exports = function(config) {

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    sl_chrome_win10: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10'
    },
    sl_firefox_win10: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 10'
    },
    sl_ie_11_win10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 10',
      version: '11'
    },
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '44'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '40'
    },
    sl_osx_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
    },
    sl_osx_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.10',
    },
    sl_osx_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'OS X 10.10',
    },
    sl_ie_11_win8_1: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_ie_11_win7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '11'
    }
  };

  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    files: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'js/*.js',
      'test/*.spec.js'
    ],
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      }
    },
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
