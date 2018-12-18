'use strict';

const { EnvironmentPlugin } = require('webpack');
const OfflinePlugin = require('offline-plugin');
const samples = require('./samples/samples');

const sampleFilenames = [
  'vsco2-piano-mf-ogg',
  'vsco2-piano-mf-mp3',
  'vsco2-glock-ogg',
  'vsco2-glock-mp3',
  'kasper-singing-bowls-ogg',
  'kasper-singing-bowls-mp3',
].reduce(
  (sampleFiles, samplesName) =>
    sampleFiles.concat(
      Object.keys(samples[samplesName]).map(key => samples[samplesName][key])
    ),
  []
);

const config = require('./webpack.config');

config.plugins.push(
  new EnvironmentPlugin(['NODE_ENV']),
  new OfflinePlugin({
    appShell: '/',
    externals: sampleFilenames,
    autoUpdate: true,
  })
);

module.exports = config;
