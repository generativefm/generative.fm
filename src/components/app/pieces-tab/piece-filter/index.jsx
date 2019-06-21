import React from 'react';
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

export default PieceFilter;
