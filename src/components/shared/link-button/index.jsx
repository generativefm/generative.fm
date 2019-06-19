import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './link-button.scss';

const LinkButton = ({ onClick, title, children, className = '' }) => (
  <button
    type="button"
    className={classNames('link-btn', className)}
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

LinkButton.propTypes = {
  onClick: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  className: propTypes.string,
};

export default LinkButton;
