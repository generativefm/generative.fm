import React from 'react';
import propTypes from 'prop-types';
import './drop-down.scss';

const Dropdown = ({ options, value, onChange, title }) => (
  <select
    className="drop-down"
    value={value}
    onChange={event => onChange(event.target.value)}
    title={title}
  >
    {options.map(opt => (
      <option className="drop-down__item" key={opt.value} value={opt.value}>
        {opt.name}
      </option>
    ))}
  </select>
);

Dropdown.propTypes = {
  options: propTypes.array.isRequired,
  value: propTypes.any.isRequired,
  onChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
};

export default Dropdown;
