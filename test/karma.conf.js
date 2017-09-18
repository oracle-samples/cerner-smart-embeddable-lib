var webpack = require('karma-webpack');
var webpackConfig = require('../webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');


webpackConfig.module = {
  rules: [
    // transpile all files except testing sources with babel as usual
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        path.resolve('src/js/'),
        path.resolve('node_modules/'),
      ],
      use: ['babel-loader'],
    },
    {
      enforce: 'pre',
      test: /\.js?$/,
      use: ['isparta-loader'],
      include: path.resolve('src/js/'),
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!less-loader',
        publicPath: '/dist',
      }),
    },
    {
      test: /\.js$/,
      include: /src|index\.js/,
      use: ['babel-loader'],
    },
  ],
};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*_spec.js'
    ],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    browsers: [ 'PhantomJS' ],
    preprocessors: {
      'test/**/*_spec.js': ['webpack'],
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'target/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'text-summary' },
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
  });
};
