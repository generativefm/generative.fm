'use strict';

const fetch = require('node-fetch');
const OfflinePlugin = require('offline-plugin');
const config = require('./webpack.config');
const fetchSampleSpec = require('./src/util/sample-client/fetch-sample-spec');

config.mode = 'production';
delete config.devtool;

const getConfig = fetchSampleSpec(fetch).then(spec => {
  const { samples } = spec;
  const sampleFilenames = Reflect.ownKeys(samples).reduce(
    (filenames, instrumentName) => {
      const instrumentSamplesByFormat = samples[instrumentName];
      return filenames.concat(
        Reflect.ownKeys(instrumentSamplesByFormat).reduce(
          (instrumentSampleFilenames, format) => {
            const formatSamples = instrumentSamplesByFormat[format];
            if (Array.isArray(formatSamples)) {
              return instrumentSampleFilenames.concat(formatSamples);
            }
            return instrumentSampleFilenames.concat(
              Object.values(formatSamples)
            );
          },
          []
        )
      );
    },
    []
  );

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

  return config;
});

module.exports = getConfig;
