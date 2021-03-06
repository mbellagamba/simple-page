module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    'selenium_standalone': {
      server: {
        seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          chrome: {
            arch: process.arch,
            baseURL: 'http://chromedriver.storage.googleapis.com'
          }
        }
      }
    },
    shell: {
      options: {
        stderr: false
      },
      jasmine: {
        command: 'jasmine JASMINE_CONFIG_PATH=test/e2e/jasmine.json'
      },
      screenshots: {
        command: "node test/e2e/e2e.js"
      },
      resize: {
        command: "node test/e2e/resize.js"
      }
    },
    connect: {
      server: {
        options: {
          port: 1337,
          base: {
            path: '.',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-selenium-standalone');

  // Default task(s).
  grunt.registerTask('default', 'starts the screen shots comparisons', function () {
    var tasks = ['selenium_standalone:server:install',
      'selenium_standalone:server:start',
      'connect:server',
      'shell:screenshots',
      'shell:resize',
      'selenium_standalone:server:stop',
      'shell:jasmine'];
    // Use the force option for all tasks declared in the previous line
    grunt.option('force', true);
    grunt.task.run(tasks);
  });

  grunt.registerTask('ci-test', ['connect:server', 'shell:screenshots', 'shell:resize', 'shell:jasmine']);
};
