import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faVolumeOff,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import noop from '../../../util/noop';
import './styles.scss';

const Controls = ({ isReady, isPlaying, isMuted, onClick }) => {
  if (!isReady) {
    return <div>...</div>;
  }
  const buttonContents = isPlaying ? (
    <div>
      <FontAwesomeIcon
        icon={faVolumeOff}
        className={isMuted ? '' : 'inactive'}
      />{' '}
      /{' '}
      <FontAwesomeIcon
        icon={faVolumeUp}
        className={isMuted ? 'inactive' : ''}
      />
    </div>
  ) : (
    <FontAwesomeIcon icon={faPlay} />
  );
  return (
    <button type="button" className="control-btn" onClick={onClick}>
      {buttonContents}
    </button>
  );
};

Controls.propTypes = {
  isReady: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  onClick: PropTypes.func,
};

Controls.defaultProps = {
  isReady: false,
  isPlaying: false,
  isMuted: false,
  onClick: noop,
};

export default Controls;
