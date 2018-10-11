import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const OverFlowZone = ({
  handleMouseDown,
  handleDragEvent,
  handleTouchStart,
}) => (
  <div
    className="overflow-zone"
    onMouseDown={handleMouseDown}
    onTouchStart={handleTouchStart}
    onDrag={handleDragEvent}
    onDragStart={handleDragEvent}
  />
);

OverFlowZone.propTypes = {
  handleMouseDown: PropTypes.func.isRequired,
  handleTouchStart: PropTypes.func.isRequired,
  handleDragEvent: PropTypes.func.isRequired,
};

export default OverFlowZone;
