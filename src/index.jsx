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
import setImported from './store/actions/creators/set-imported.creator';
import STATE_STORAGE_KEY from './store/middleware/local-storage.middleware/key';
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

  //eslint-disable-next-line no-console
  console.log('https://github.com/generative-music/generative.fm');
}

const openerOrigin = isProduction
  ? 'https://play.generative.fm'
  : 'http://localhost:8080';

window.addEventListener('message', event => {
  const { data, source, origin } = event;
  if (origin !== openerOrigin) {
    return;
  }
  if (data.type === 'export-request') {
    const state = window.localStorage.getItem(STATE_STORAGE_KEY);
    source.postMessage({ type: 'export', state }, origin);
    return;
  }
  if (data.type === 'set-import-request') {
    store.dispatch(setImported());
    source.postMessage({ type: 'import-set' }, origin);
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
