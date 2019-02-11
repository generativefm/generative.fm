'use strict';

const OfflinePlugin = require('offline-plugin');
const prependEndpointToSampleFilename = require('./src/util/prepend-endpoint-to-sample-filename');
const { samples } = require('../samples.generative.fm/public/index.0.0.3.json');

const instrumentNames = Reflect.ownKeys(samples);

const sampleFilenames = instrumentNames.reduce((filenames, instrumentName) => {
  const instrumentSamples = samples[instrumentName];
  return filenames.concat(
    Reflect.ownKeys(instrumentSamples).reduce(
      (instrumentFilenames, format) =>
        instrumentFilenames.concat(
          Object.values(instrumentSamples[format]).map(filename =>
            prependEndpointToSampleFilename(instrumentName, format, filename)
          )
        ),
      []
    )
  );
}, []);

const config = require('./webpack.config');

config.mode = 'production';
delete config.devtool;

config.plugins.push(
  new OfflinePlugin({
    appShell: '/',
    externals: sampleFilenames.concat(['favicon.ico', 'manifest.json']),
    autoUpdate: true,
    ServiceWorker: {
      events: true,
    },
    caches: {
      main: [':rest:'],
      optional: sampleFilenames,
    },
  })
);

module.exports = config;
