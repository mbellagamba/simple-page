module.exports = function(config) {

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    // Windows browsers
    ie_11_win8_1: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    // OSX browsers
    safari_osx: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
    },
    // Linux browsers
    firefox_linux: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    sl_chrome_linux: {
      base: 'SauceLabs',
      browserName: 'chrome'
    }
  };

  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    files: [
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
      testName: 'Karma and Sauce Labs demo'
    },
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
