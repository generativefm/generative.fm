import React from 'react';
import { render } from 'react-dom';
import { install } from 'offline-plugin/runtime';
import { Provider } from 'react-redux';
import store from './store';
import isProduction from './config/is-production';
import App from './containers/app.container';
import './styles/base-styles.scss';

if (isProduction) {
  install();
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
