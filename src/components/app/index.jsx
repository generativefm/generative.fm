import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import classNames from 'classnames';
import isMobile from '@config/is-mobile';
import Controls from './controls';
import HelpTabComponent from './help-tab';
import TitleNavContainer from '@containers/title-nav.container';
import AboutTabContainer from '@containers/about-tab.container';
import PiecesTabContainer from '@containers/pieces-tab.container';
import RecordTabContainer from '@containers/record-tab.container';
import UserTab from './user-tab';
import './app.scss';

const AppComponent = () => {
  const [isHoverEnabled, setIsHoverEnabled] = useState(!isMobile);
  useEffect(() => {
    let lastTouchTime = 0;
    const enableHover = () => {
      if (!isHoverEnabled && Date.now() - lastTouchTime > 500) {
        setIsHoverEnabled(true);
      }
    };
    const disableHover = () => {
      lastTouchTime = Date.now();
      if (isHoverEnabled) {
        setIsHoverEnabled(false);
      }
    };
    window.addEventListener('touchstart', disableHover, true);
    window.addEventListener('mousemove', enableHover, true);
    return () => {
      window.removeEventListener('touchstart', disableHover, true);
      window.removeEventListener('mousemove', enableHover, true);
    };
  }, []);

  return (
    <Router>
      <div className={classNames('app', { 'has-hover': isHoverEnabled })}>
        <div className="app__content">
          <div>
            <nav>
              <TitleNavContainer />
            </nav>
            <main>
              <Switch>
                <Route exact path="/" component={PiecesTabContainer} />
                <Route exact path="/about" component={AboutTabContainer} />
                <Route exact path="/help" component={HelpTabComponent} />
                <Route exact path="/record" component={RecordTabContainer} />
                <Route exact path="/user" component={UserTab} />
                <Route
                  path="/music/:pieceId"
                  render={({ match, history }) => (
                    <PiecesTabContainer
                      pieceId={match.params.pieceId}
                      history={history}
                    />
                  )}
                />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </main>
          </div>
        </div>
        <footer className="app__controls">
          <Controls />
        </footer>
      </div>
    </Router>
  );
};

export default AppComponent;
