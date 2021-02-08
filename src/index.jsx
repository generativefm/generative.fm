import React from 'react';
import { render } from 'react-dom';
import { install } from 'offline-plugin/runtime';
import { Provider } from 'react-redux';
import API_ENDPOINT from '@config/api-endpoint';
import stringifyState from '@utils/stringify-state';
import getOnlineStatus from '@utils/get-online-status';
import store from './store';
import indicateUpdateAvailable from './store/actions/creators/indicate-update-available.creator';
import isProduction from './config/is-production';
import App from './containers/app.container';
import enableExporting from './enable-exporting';
import './styles/base-styles.scss';

if (isProduction) {
  install({
    onUpdateReady: () => {
      store.dispatch(indicateUpdateAvailable());
    },
    onUpdated: () => {
      window.location.reload();
    },
  });

  if (navigator.sendBeacon) {
    window.addEventListener('beforeunload', () => {
      if (getOnlineStatus()) {
        navigator.sendBeacon(
          `${API_ENDPOINT}/state`,
          stringifyState(store.getState())
        );
      }
    });
  }
}

enableExporting();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
