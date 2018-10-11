import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { install } from 'offline-plugin/runtime';
import Player from './components/player';
import TrackSelector from './components/track-selector';
import pieces from './pieces';
import isProduction from './config/is-production';

if (isProduction) {
  install();
}

render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={TrackSelector} />
        {pieces.map((piece, i) => (
          <Route
            exact
            path={`/${piece.link}`}
            key={i}
            render={() => <Player piece={piece} />}
          />
        ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);
