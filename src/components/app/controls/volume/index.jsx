import React from 'react';
import propTypes from 'prop-types';
import Icon from './icon';
import Slider from './slider';
import './volume.scss';

const VolumeComponent = ({ volumePct, isMuted, onChange, mute, unmute }) => {
  const displayPct = isMuted ? 0 : volumePct;
  return (
    <div className="volume">
      <Icon pct={displayPct} onClick={isMuted ? unmute : mute} />
      <Slider pct={displayPct} onChange={onChange} />
    </div>
  );
};

VolumeComponent.propTypes = {
  volumePct: propTypes.number.isRequired,
  isMuted: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  mute: propTypes.func.isRequired,
  unmute: propTypes.func.isRequired,
};

export default VolumeComponent;
