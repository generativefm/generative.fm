import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import './control-button.scss';

const ControlButtonComponent = ({ onClick, faIcon, hasBorder, isActive }) => (
  <button
    type="button"
    className={classnames('control-button', {
      'control-button--has-border': hasBorder,
      'control-button--is-active': isActive,
    })}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faIcon} />
  </button>
);

ControlButtonComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  faIcon: propTypes.object.isRequired,
  hasBorder: propTypes.bool,
  isActive: propTypes.bool,
};

ControlButtonComponent.defaultProps = {
  hasBorder: false,
  isActive: false,
};

export default ControlButtonComponent;
