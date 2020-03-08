'use strict';

const OfflinePlugin = require('offline-plugin');
const configPromise = require('./webpack.config');

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
      ],
      autoUpdate: true,
      ServiceWorker: {
        events: true,
      },
    })
  );
  return config;
});

module.exports = getConfig;
