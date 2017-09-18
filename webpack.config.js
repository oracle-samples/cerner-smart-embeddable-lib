/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pjson = require('./package.json');

module.exports = {
  entry: { 'cerner-smart-embeddable-lib': [
    './webpack.entry.js'
  ]},
  output: {
    filename: './js/[name]-' + pjson.version + '.js',
    path: path.resolve(path.join(__dirname, 'dist')),
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name]-' + pjson.version + '.css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
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
      {
        test: /\.js$/,
        loader: "webpack-strip-block"
      },
    ],
  }
};
