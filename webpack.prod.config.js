'use strict';

const OfflinePlugin = require('offline-plugin');
const samples = require('./samples/samples');

const pianoSamples = samples['vsco2-piano-mf'];

const config = require('./webpack.config');

config.plugins.push(
  new OfflinePlugin({
    appShell: '/',
    externals: Object.keys(pianoSamples).map(key => pianoSamples[key]),
    publicPath: 'https://generativemusic.alexbainter.com',
  })
);

module.exports = config;
