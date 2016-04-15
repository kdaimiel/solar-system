// Karma configuration
// Generated on Wed Jun 24 2015 17:14:26 GMT+0200 (Romance Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/underscore/underscore.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/three.js/build/three.js',
      {pattern: 'bower_components/three.js/examples/js/controls/**.js', included: true},
      'bower_components/three.js/examples/js/libs/stats.min.js',
      'src/js/objects/SolarBody.js',
      'src/js/objects/PlanetMesh.js',
      {pattern: 'src/js/**/*js', included: true},
      {pattern: 'test/**/*Spec.js', included: false},
      'test/test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'src/js/index.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], //An browser with WebGLRenderer is needed to pass test


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // No activity browser Timeout
    browserNoActivityTimeout: 50000

  });
};
