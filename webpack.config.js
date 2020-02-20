'use strict';

const path = require('path');
const fs = require('fs').promises;
const { R_OK } = require('fs').constants;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

const adjacentSamplePath = path.resolve('../samples.generative.fm/public');

//eslint-disable-next-line no-console
const log = msg => console.log(msg);

const makeConfig = alias => ({
  mode: 'development',
  devtool: 'sourcemap',
  entry: ['@babel/polyfill', './src'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    alias,
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
      {
        test: [/\.mp3$/, /\.ico$/],
        use: 'file-loader',
      },
      {
        test: /\.webmanifest/,
        use: ['file-loader', 'app-manifest-loader'],
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
    new EnvironmentPlugin({
      SAMPLE_FILE_HOST: '//localhost:6969',
    }),
  ],
});

const aliasPromise = fs
  .readdir(path.resolve('./src'))
  .then(filenames =>
    Promise.all(
      filenames.map(filename => fs.lstat(path.resolve(`./src/${filename}`)))
    ).then(stats => filenames.filter((_, i) => stats[i].isDirectory()))
  )
  .then(dirnames =>
    dirnames.reduce((alias, dirname) => {
      alias[`@${dirname}`] = path.resolve(`./src/${dirname}`);
      return alias;
    }, {})
  );

const checkSamplesPromise = fs.access(adjacentSamplePath, R_OK).catch(() => {
  log(
    `Local sample files not found (looked for ${adjacentSamplePath}). Music will not be playable!`
  );
  log(
    'To fix, clone https://github.com/generative-music/samples.generative.fm to a directory adjacent to this one and run its "build:samples" npm script.'
  );
  log('Then, run this script again.');
});

const configPromise = Promise.all([
  aliasPromise,
  checkSamplesPromise,
]).then(([alias]) => makeConfig(alias));

module.exports = configPromise;
