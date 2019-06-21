import React from 'react';
import propTypes from 'prop-types';
import Dropdown from '@components/shared/drop-down';
import './piece-filter.scss';

const PieceFilter = ({ label, value, options, onChange, title }) => (
  <div className="piece-filter">
    <span className="piece-filter__label">{label}</span>
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      title={title}
    />
  </div>
);

PieceFilter.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.any.isRequired,
  options: propTypes.array.isRequired,
  onChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
};

export default PieceFilter;
