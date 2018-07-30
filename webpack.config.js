'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const samples = require('./samples/samples');

const pianoSamples = samples['vco2-piano-mf'];

const config = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: ['babel-polyfill', './src'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    historyApiFallback: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Generative Music',
      template: './index.template.html',
    }),
    new OfflinePlugin({
      appShell: '/',
      externals: Object.keys(pianoSamples).map(key => pianoSamples[key]),
      publicPath:
        // eslint-disable-next-line no-process-env
        process.env.NODE_ENV === 'production'
          ? 'https://generativemusic.alexbainter.com'
          : '',
    }),
  ],
};

module.exports = config;
