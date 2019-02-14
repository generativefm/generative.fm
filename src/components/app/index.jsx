import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TitleNavComponent from './title-nav';
import Controls from './controls';
import AboutTabContainer from '../../containers/about-tab.container';
import PiecesTabContainer from '../../containers/pieces-tab.container';
import './app.scss';

const AppComponent = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Router>
          <div>
            <nav>
              <TitleNavComponent />
            </nav>
            <main>
              <Route exact path="/" component={PiecesTabContainer} />
              <Route exact path="/about" component={AboutTabContainer} />
              <Route
                path="/music/:filter"
                render={({ match }) => (
                  <PiecesTabContainer filter={match.params.filter} />
                )}
              />
            </main>
          </div>
        </Router>
      </div>
      <footer className="app__controls">
        <Controls />
      </footer>
    </div>
  );
};

export default AppComponent;
