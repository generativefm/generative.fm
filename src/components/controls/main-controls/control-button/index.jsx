import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import './control-button.scss';

const ControlButtonComponent = ({
  onClick,
  faIcon,
  hasBorder,
  isActive,
  isDisabled,
}) => (
  <button
    type="button"
    className={classnames('control-button', {
      'control-button--has-border': hasBorder,
      'control-button--is-active': isActive,
      'control-button--is-disabled': isDisabled,
    })}
    onClick={onClick}
    disabled={isDisabled}
  >
    <FontAwesomeIcon icon={faIcon} />
  </button>
);

ControlButtonComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  faIcon: propTypes.object.isRequired,
  hasBorder: propTypes.bool,
  isActive: propTypes.bool,
  isDisabled: propTypes.bool,
};

ControlButtonComponent.defaultProps = {
  hasBorder: false,
  isActive: false,
  isDisabled: false,
};

export default ControlButtonComponent;
