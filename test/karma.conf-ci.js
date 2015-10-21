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
      browserName: 'microsoftedge',
      platform: 'Windows 10'
    },
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    sl_osx_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10'
    },
    sl_osx_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.10'
    },
    sl_osx_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'OS X 10.10'
    }
  };

  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'bower_components/bootstrap/dist/css/bootstrap.min.css', included: false },
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
