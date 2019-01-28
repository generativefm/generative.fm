'use strict';

const OfflinePlugin = require('offline-plugin');
const samples = require('./samples/samples');

const sampleFilenames = [
  'vsco2-piano-mf-ogg',
  'vsco2-piano-mf-mp3',
  'vsco2-glock-ogg',
  'vsco2-glock-mp3',
  'kasper-singing-bowls-ogg',
  'kasper-singing-bowls-mp3',
  'otherness-ogg',
  'otherness-mp3',
  'vsco2-violin-arcvib-ogg',
  'vsco2-violin-arcvib-mp3',
  'vsco2-contrabass-susvib-ogg',
  'vsco2-contrabass-susvib-mp3',
].reduce(
  (sampleFiles, samplesName) =>
    sampleFiles.concat(
      Object.keys(samples[samplesName]).map(key => samples[samplesName][key])
    ),
  []
);

const config = require('./webpack.config');

config.mode = 'production';
delete config.devtool;

config.plugins.push(
  new OfflinePlugin({
    appShell: '/',
    externals: sampleFilenames,
    autoUpdate: true,
  })
);

module.exports = config;
