'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const adjacentSamplePath = path.resolve('../samples.generative.fm/public');

//eslint-disable-next-line no-console
const log = msg => console.log(msg);

const config = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: ['babel-polyfill', './src'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  devServer: {
    historyApiFallback: true,
    port: 9999,
    contentBase: [path.resolve(), adjacentSamplePath],
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: [/\.css$/, /\.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/styles'],
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          { loader: 'url-loader', options: { limit: 10 * 1024 } },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.gfm\.manifest\.json/,
        use: path.resolve('./piece-loader.js'),
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.template.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
};

const configPromise = new Promise(resolve => {
  fs.access(adjacentSamplePath, fs.constants.R_OK, err => {
    if (err) {
      log(
        `Local sample files not found (looked for ${adjacentSamplePath}). Music will not be playable!`
      );
      log(
        'To fix, clone https://github.com/generative-music/samples.generative.fm to a directory adjacent to this one and run its "build:samples" npm script.'
      );
      log('Then, run this script again.');
    }
    resolve(config);
  });
});

module.exports = configPromise;
