// Karma configuration
// Generated on Wed Jun 24 2015 17:14:26 GMT+0200 (Romance Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'web-components'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'node_modules/three/build/three.min.js', included: true, watched: false},
      {pattern: 'node_modules/three/examples/js/controls/**.js', included: true, watched: false},
      {pattern: 'node_modules/three/examples/js/objects/Lensflare.js', included: true, watched: false},
      'src/js/objects/SolarBody.js',
      'src/js/objects/PlanetMesh.js',
      'src/js/**/*js',
      {pattern: 'demo/data/**/*', watched: true, served: true, included: false},
      {pattern: 'demo/img/**/*', watched: true, served: true, included: false},
      {pattern: 'demo/css/**/*', watched: true, served: true, included: true},
      {pattern: 'test/**/*componentSpec.*', watched: true, included: false},
      'test/**/*Spec.*'
    ],


    // a map of path-proxy pairs.
    proxies: {
      '/data/': '/base/demo/data',
      '/img/': '/base/demo/img',
      '/base/test/js/css/': '/base/demo/css',
      '/base/test/js/img/': '/base/demo/img'
    },


    // a map of preprocessors to use.
    preprocessors: {
      'src/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // coverage reporter to use
    coverageReporter: {
      type : 'html',
      dir : 'coverage'
    },


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
    browsers: ['Chrome', 'ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
