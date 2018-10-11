import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const OverFlowZone = ({ handleMouseDown, handleDragEvent }) => (
  <div
    className="overflow-zone"
    onMouseDown={handleMouseDown}
    onDrag={handleDragEvent}
    onDragStart={handleDragEvent}
  />
);

OverFlowZone.propTypes = {
  handleMouseDown: PropTypes.func,
  handleDragEvent: PropTypes.func,
};

export default OverFlowZone;
