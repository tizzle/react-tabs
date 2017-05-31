'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const EXAMPLES_DIR = path.join(__dirname, 'examples');

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
    if (dir === 'build') {
      return entries;
    }

    const isDraft = dir.charAt(0) === '_';
    const isDirectory = fs.lstatSync(path.join(EXAMPLES_DIR, dir)).isDirectory();

    if (!isDraft && isDirectory) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');
    }

    return entries;
  }, {});
}

module.exports = {
  devtool: 'eval',
  entry: buildEntries(),
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'examples/__build__'),
    publicPath: '/__build__/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    alias: {
      'react': 'preact-compat/dist/preact-compat',
      'react-dom/server': 'preact-compat/server',
      'react-dom': 'preact-compat/dist/preact-compat',
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'shared' }),
  ]
};
