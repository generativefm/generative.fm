import React from 'react';
import propTypes from 'prop-types';
import TitleNavContainer from '../../containers/title-nav.container';
import Controls from './controls';
import tabs from './tabs';
import './app.scss';

const AppComponent = ({ activeTabId }) => {
  const Content = tabs[activeTabId];
  return (
    <div className="app">
      <div className="app__content">
        <nav>
          <TitleNavContainer />
        </nav>
        <main>{Content && <Content />}</main>
      </div>
      <footer className="app__controls">
        <Controls />
      </footer>
    </div>
  );
};

AppComponent.propTypes = {
  activeTabId: propTypes.string.isRequired,
};

export default AppComponent;
