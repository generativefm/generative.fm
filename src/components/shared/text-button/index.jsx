import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './text-button.scss';

const TextButton = ({
  title,
  onClick,
  children,
  className = '',
  isDisabled = false,
}) => (
  <button
    type="button"
    className={classNames('text-btn', className)}
    disabled={isDisabled}
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

TextButton.propTypes = {
  title: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  className: propTypes.string,
  isDisabled: propTypes.bool,
};

export default TextButton;
