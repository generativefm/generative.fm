'use strict';

const OfflinePlugin = require('offline-plugin');
const getSamplesByFormat = require('@generative-music/samples-alex-bainter');
const configPromise = require('./webpack.config');

const samplesByFormat = getSamplesByFormat('//samples.alexbainter.com');

const allSampleFilenames = ['ogg', 'mp3'].reduce((filenames, format) => {
  const formatSamples = samplesByFormat[format];
  return filenames.concat(
    Object.keys(formatSamples).reduce((sampleFilenames, sampleName) => {
      const samples = formatSamples[sampleName];
      if (Array.isArray(samples)) {
        return sampleFilenames.concat(samples);
      }
      return sampleFilenames.concat(Object.values(samples));
    }, [])
  );
}, []);

const getConfig = configPromise.then(config => {
  config.mode = 'production';
  delete config.devtool;
  config.plugins.push(
    new OfflinePlugin({
      appShell: '/',
      externals: [
        'favicon.ico',
        'manifest.json',
        'https://platform.twitter.com/widgets.js',
      ].concat(allSampleFilenames),
      autoUpdate: true,
      ServiceWorker: {
        events: true,
      },
      caches: {
        main: [':rest:'],
        optional: allSampleFilenames,
      },
    })
  );
  return config;
});

module.exports = getConfig;
