import React from 'react';
import propTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import IconButton from '@components/shared/icon-button';
import TextButton from '@components/shared/text-button';
//import AirPlay from './air-play';
import './title-nav.scss';

const TitleNavLink = ({
  text,
  linkTo,
  parentClass,
  hasDot = false,
  exact = false,
  isActive = match => match && match.url === linkTo,
}) => (
  <li className={`${parentClass}__item`}>
    {hasDot && <div className="title-nav__header__tab-list__item__dot" />}
    <NavLink
      className={`${parentClass}__item__link`}
      activeClassName={`${parentClass}__item__link--is-active`}
      to={linkTo}
      exact={exact}
      isActive={isActive}
    >
      {text}
      <div className={`${parentClass}__item__active-indicator`} />
    </NavLink>
  </li>
);

TitleNavLink.propTypes = {
  text: propTypes.string.isRequired,
  linkTo: propTypes.string.isRequired,
  parentClass: propTypes.string.isRequired,
  hasDot: propTypes.bool,
  exact: propTypes.bool,
  isActive: propTypes.func,
};

const matchRootOrMusic = (match, location) =>
  location.pathname === '/' || location.pathname.startsWith('/music');

const TitleNavComponent = ({
  isUpdateAvailable,
  notifications,
  isInstallable,
  dismissNotification,
  promptInstallation,
}) => {
  let notification;
  if (notifications.length > 0) {
    //eslint-disable-next-line prefer-destructuring
    notification = notifications[0];
  }

  return (
    <div className="title-nav">
      <div className="title-nav__header">
        <div className="title-nav__header__info">
          <h1 className="title-nav__header__info__title title-nav__header__info__title--primary">
            Generative.fm
            <span className="title-nav__header__info__title__cast-btn">
              <google-cast-launcher />
            </span>
          </h1>
          <h2 className="title-nav__header__info__title title-nav__header__info__title--secondary">
            Ambient Generative Music by{' '}
            <a
              href="https://alexbainter.com"
              className="secret-link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Alex Bainter
            </a>
          </h2>

          {isInstallable && (
            <TextButton
              title="Install"
              className="title-nav__header__info__install-btn"
              onClick={() => promptInstallation()}
            >
              Install
            </TextButton>
          )}
        </div>

        <ul className="title-nav__header__tab-list">
          <TitleNavLink
            text="PLAY"
            parentClass="title-nav__header__tab-list"
            linkTo="/"
            isActive={matchRootOrMusic}
          />
          <TitleNavLink
            text="RECORD"
            parentClass="title-nav__header__tab-list"
            linkTo="/record"
          />
          <TitleNavLink
            text="HELP"
            parentClass="title-nav__header__tab-list"
            linkTo="/help"
          />
          <TitleNavLink
            text="ABOUT"
            parentClass="title-nav__header__tab-list"
            linkTo="/about"
            hasDot={isUpdateAvailable}
          />
        </ul>
      </div>
      {notification && (
        <div className="title-nav__notification">
          <a
            href={notification.link}
            target="_blank"
            rel="noreferrer noopener"
            className="title-nav__notification__msg"
          >
            {notification.message}
          </a>
          <IconButton
            className="title-nav__notification__close"
            faIcon={faTimes}
            title="Dismiss"
            onClick={() => dismissNotification(notification.id)}
          />
        </div>
      )}
    </div>
  );
};

TitleNavComponent.propTypes = {
  isUpdateAvailable: propTypes.bool.isRequired,
  notifications: propTypes.array.isRequired,
  isInstallable: propTypes.bool.isRequired,
  dismissNotification: propTypes.func.isRequired,
  promptInstallation: propTypes.func.isRequired,
};

export default TitleNavComponent;
