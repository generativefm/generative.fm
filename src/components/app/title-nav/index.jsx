import React from 'react';
import propTypes from 'prop-types';
import tabs from '../tabs';
import './title-nav.scss';

const TitleNavComponent = ({ activeTabId, onTabClick }) => {
  return (
    <div className="title-nav">
      <h1 className="title-nav__title title-nav__title--primary">
        Generative Music
      </h1>
      <h2 className="title-nav__title title-nav__title--secondary">
        By{' '}
        <a
          className="title-nav__title__secret-link"
          href="https://alexbainter.com"
          //eslint-disable-next-line react/jsx-no-target-blank
          target="_blank"
        >
          Alex Bainter
        </a>
      </h2>
      <ul className="title-nav__tab-list">
        {Reflect.ownKeys(tabs).map(tabId => (
          <li key={tabId} className="title-nav__tab-list__item">
            <button
              type="button"
              className="title-nav__tab-list__item__button"
              onClick={() => onTabClick(tabId)}
            >
              {tabId.toString().toUpperCase()}
            </button>
            {activeTabId === tabId && (
              <div className="title-nav__tab-list__item__active-indicator" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

TitleNavComponent.propTypes = {
  activeTabId: propTypes.string.isRequired,
  onTabClick: propTypes.func.isRequired,
};

export default TitleNavComponent;
