import React from 'react';
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

export default LinkButton;
