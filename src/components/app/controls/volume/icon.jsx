import React from 'react';
import propTypes from 'prop-types';
import {
  faVolumeMute,
  faVolumeDown,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import ControlButton from '../control-button';

const IconComponent = ({ pct, onClick }) => {
  let icon;
  if (pct <= 0) {
    icon = faVolumeMute;
  } else if (pct < 50) {
    icon = faVolumeDown;
  } else {
    icon = faVolumeUp;
  }
  return <ControlButton faIcon={icon} onClick={onClick} />;
};

IconComponent.propTypes = {
  pct: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
};

export default IconComponent;
