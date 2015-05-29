'use strict';

module.exports = function(config) {

  var configuration = {
    autoWatch : true,
    singleRun: false,
    

    frameworks: ['browserify', 'jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-browserify'
    ],
    
    files: [
      'tests/polyfills/function.prototype.bind.js',
      'tests/**/*.spec.js'
    ],

    preprocessors: {
      'tests/**/*.spec.js': ['browserify']
    },
    
    browserify: {
      debug: true,
      transform: [ 'reactify' ],
      extensions: ['.jsx']
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
