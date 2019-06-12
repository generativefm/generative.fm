import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import './icon-button.scss';

const IconButton = ({
  faIcon,
  onClick,
  title,
  className = '',
  isFilled = false,
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={classNames('icon-button', className, {
      'icon-button--is-filled': isFilled,
    })}
  >
    <FontAwesomeIcon icon={faIcon} />
  </button>
);

IconButton.propTypes = {
  faIcon: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  className: propTypes.string,
  isFilled: propTypes.bool,
};

export default IconButton;
