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
import ControlsComponent from './components/controls';
import './styles/base-styles.scss';

if (isProduction) {
  install();
}

render(<ControlsComponent />, document.getElementById('root'));
