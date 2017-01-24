// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
/*

npm i --save-dev karma-phantomjs-launcher

plugins: [
    require( 'karma-jasmine' ),
    require( 'karma-chrome-launcher' ),
    require( 'karma-phantomjs-launcher' ),
    require( 'karma-remap-istanbul' ),
    require( 'angular-cli/plugins/karma' )
],
...
browsers: [ 'PhantomJS', 'Chrome' ],

Since you want a completely headless experience, you can remove Chrome from the  browsers  property, 
and remove the  karma-chrome-launcher  from the  plugins  array as well.

*/

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
	  require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
