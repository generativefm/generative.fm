import React from 'react';
import propTypes from 'prop-types';
// import {} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from './slider';
import './volume.scss';

const VolumeComponent = ({ pct, onChange }) => (
  <div className="volume">
    <Slider pct={pct} onChange={onChange} />
  </div>
);

VolumeComponent.propTypes = {
  pct: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default VolumeComponent;
