import {
  faPlay,
  faRandom,
  faStepBackward,
  faStepForward,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import ControlButtonComponent from '../control-button';
import ButtonSpacerComponent from './button-spacer';
import './main-controls.scss';

function useKeyboardEvent(key, callback) {
  useEffect(() => {
    const handler = event => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  },[callback]);
}

const makePrimaryButton = (faIcon, onClick) =>
  function PrimaryButtonComponent() {
    return (
      <ControlButtonComponent
        faIcon={faIcon}
        onClick={onClick}
        isPrimary={true}
      />
    );
  };

const MainControlsComponent = ({
  isPlaying,
  isShuffleActive,
  enableShuffle,
  disableShuffle,
  onPreviousClick,
  onNextClick,
  onStopClick,
  onPlayClick,
}) => {
  const PrimaryButtonComponent = isPlaying
    ? makePrimaryButton(faStop, onStopClick)
    : makePrimaryButton(faPlay, onPlayClick);
  useKeyboardEvent(' ', isPlaying ? onStopClick : onPlayClick);
  useKeyboardEvent('ArrowLeft', onPreviousClick);
  useKeyboardEvent('ArrowRight', onNextClick);
  return (
    <div className="main-controls">
      {!isMobile && <ButtonSpacerComponent />}
      <ControlButtonComponent
        faIcon={faStepBackward}
        onClick={onPreviousClick}
      />
      <PrimaryButtonComponent />
      <ControlButtonComponent faIcon={faStepForward} onClick={onNextClick} />
      <ControlButtonComponent
        faIcon={faRandom}
        onClick={isShuffleActive ? disableShuffle : enableShuffle}
        isActive={isShuffleActive}
      />
    </div>
  );
};

MainControlsComponent.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  isShuffleActive: propTypes.bool.isRequired,
  enableShuffle: propTypes.func.isRequired,
  disableShuffle: propTypes.func.isRequired,
  onPreviousClick: propTypes.func.isRequired,
  onNextClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
};

export default MainControlsComponent;
