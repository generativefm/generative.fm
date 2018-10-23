import React from 'react';
import propTypes from 'prop-types';
import Icon from './icon';
import Slider from './slider';
import './volume.scss';

const VolumeComponent = ({ pct, onChange, onIconClick }) => (
  <div className="volume">
    <Icon pct={pct} onClick={onIconClick} />
    <Slider pct={pct} onChange={onChange} />
  </div>
);

VolumeComponent.propTypes = {
  pct: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  onIconClick: propTypes.func.isRequired,
};

export default VolumeComponent;
