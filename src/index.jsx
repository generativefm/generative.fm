import React from 'react';
import { render } from 'react-dom';
import { install } from 'offline-plugin/runtime';
import { Provider } from 'react-redux';
import store from './store';
import indicateUpdateAvailable from './store/actions/creators/indicate-update-available.creator';
import setOnlineStatus from './store/actions/creators/set-online-status.creator';
import isProduction from './config/is-production';
import App from './containers/app.container';
import './styles/base-styles.scss';

if (isProduction) {
  install({
    onUpdateReady: () => {
      store.dispatch(indicateUpdateAvailable());
    },
  });
}

const makeSetOnlineStatus = online => () =>
  store.dispatch(setOnlineStatus(online));

window.addEventListener('online', makeSetOnlineStatus(true));
window.addEventListener('offline', makeSetOnlineStatus(false));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
