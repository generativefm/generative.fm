import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './title-nav.scss';

const TitleNavLink = ({
  text,
  linkTo,
  hasDot = false,
  exact = false,
  isActive = match => match && match.url === linkTo,
}) => (
  <li className="title-nav__tab-list__item title-nav__tab-list__item--has-dot">
    {hasDot && <div className="title-nav__tab-list__item__dot" />}
    <NavLink
      className="title-nav__tab-list__item__link"
      activeClassName="title-nav__tab-list__item__link--is-active"
      to={linkTo}
      exact={exact}
      isActive={isActive}
    >
      {text}
      <div className="title-nav__tab-list__item__active-indicator" />
    </NavLink>
  </li>
);

TitleNavLink.propTypes = {
  text: propTypes.string,
  linkTo: propTypes.string,
  hasDot: propTypes.bool,
  exact: propTypes.bool,
  isActive: propTypes.func,
};

const matchRootOrMusic = (match, location) =>
  location.pathname === '/' || location.pathname.startsWith('/music');

const TitleNavComponent = ({ isUpdateAvailable }) => (
  <div className="title-nav">
    <h1 className="title-nav__title title-nav__title--primary">
      Generative.fm
    </h1>
    <h2 className="title-nav__title title-nav__title--secondary">
      Endlessly unique ambient music
    </h2>
    <ul className="title-nav__tab-list">
      <TitleNavLink text="MUSIC" linkTo="/" isActive={matchRootOrMusic} />
      <TitleNavLink text="ABOUT" linkTo="/about" hasDot={isUpdateAvailable} />
      <TitleNavLink text="HELP" linkTo="/help" />
      <TitleNavLink text="RECORD" linkTo="/record" />
    </ul>
  </div>
);

TitleNavComponent.propTypes = {
  isUpdateAvailable: propTypes.bool,
};

export default TitleNavComponent;
