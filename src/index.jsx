import React from 'react';
import { render } from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from 'react-router-dom';
import { install } from 'offline-plugin/runtime';
import pieces from './pieces';
import isProduction from './config/is-production';
import App from './components/app';
import './styles/base-styles.scss';

if (isProduction) {
  install();
}

render(<App />, document.getElementById('root'));
