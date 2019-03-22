import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import {
  faPlay,
  faRandom,
  faStepBackward,
  faStepForward,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import ControlButtonComponent from '../control-button';
import ButtonSpacerComponent from './button-spacer';
import './main-controls.scss';

const PREVIOUS_KEY = 'ArrowLeft';
const NEXT_KEY = 'ArrowRight';
const PLAY_STOP_KEY = ' ';

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
  const keyHandlers = {
    [PLAY_STOP_KEY]: isPlaying ? onStopClick : onPlayClick,
    [PREVIOUS_KEY]: onPreviousClick,
    [NEXT_KEY]: onNextClick,
  };

  const handleKeydown = keyEvent => {
    const keyHandler = keyHandlers[keyEvent.key];
    if (typeof keyHandler === 'function') {
      keyHandler();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  const PrimaryButtonComponent = isPlaying
    ? makePrimaryButton(faStop, onStopClick)
    : makePrimaryButton(faPlay, onPlayClick);
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
