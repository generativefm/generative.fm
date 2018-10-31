import React from 'react';
import propTypes from 'prop-types';
import {
  faPlay,
  faStop,
  faStepForward,
  faStepBackward,
  faRandom,
} from '@fortawesome/free-solid-svg-icons';
import ControlButtonComponent from '../control-button';
import ButtonSpacerComponent from './button-spacer';
import './main-controls.scss';

const makePrimaryButton = (faIcon, onClick) =>
  function PrimaryButtonComponent() {
    return (
      <ControlButtonComponent
        faIcon={faIcon}
        onClick={onClick}
        hasBorder={true}
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
  return (
    <div className="main-controls">
      <ButtonSpacerComponent />
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
