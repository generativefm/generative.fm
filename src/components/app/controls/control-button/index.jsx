import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import './control-button.scss';

const ControlButtonComponent = ({ onClick, faIcon, isPrimary, isActive }) => (
  <button
    type="button"
    className={classnames('control-button', {
      'control-button--is-primary': isPrimary,
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
  isPrimary: propTypes.bool,
  isActive: propTypes.bool,
};

ControlButtonComponent.defaultProps = {
  isPrimary: false,
  isActive: false,
};

export default ControlButtonComponent;
