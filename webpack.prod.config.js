'use strict';

const { EnvironmentPlugin } = require('webpack');
const OfflinePlugin = require('offline-plugin');
const samples = require('./samples/samples');

const pianoSamples = samples['vsco2-piano-mf'];

const config = require('./webpack.config');

config.plugins.push(
  new EnvironmentPlugin(['NODE_ENV']),
  new OfflinePlugin({
    appShell: '/',
    externals: Object.keys(pianoSamples).map(key => pianoSamples[key]),
    publicPath: 'test/',
  })
);

module.exports = config;
