import React from 'react';
import propTypes from 'prop-types';
import {
  faPlay,
  faStop,
  faStepForward,
  faStepBackward,
  faRandom,
  faSyncAlt,
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
  hasSelection,
  onRepeatClick,
  onShuffleClick,
  onBackClick,
  onForwardClick,
  onPrimaryClick,
  isRepeatActive,
  isShuffleActive,
}) => {
  const PrimaryButtonComponent = isPlaying
    ? makePrimaryButton(faStop, onPrimaryClick)
    : makePrimaryButton(faPlay, onPrimaryClick);
  return (
    <div className="main-controls">
      <ControlButtonComponent
        faIcon={faSyncAlt}
        onClick={onRepeatClick}
        isActive={isRepeatActive}
      />
      {hasSelection ? (
        <ControlButtonComponent faIcon={faStepBackward} onClick={onBackClick} />
      ) : (
        <ButtonSpacerComponent />
      )}
      <PrimaryButtonComponent />
      <ControlButtonComponent faIcon={faStepForward} onClick={onForwardClick} />
      <ControlButtonComponent
        faIcon={faRandom}
        onClick={onShuffleClick}
        isActive={isShuffleActive}
      />
    </div>
  );
};

MainControlsComponent.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  hasSelection: propTypes.bool.isRequired,
  onRepeatClick: propTypes.func.isRequired,
  onShuffleClick: propTypes.func.isRequired,
  onBackClick: propTypes.func.isRequired,
  onForwardClick: propTypes.func.isRequired,
  onPrimaryClick: propTypes.func.isRequired,
  isRepeatActive: propTypes.bool.isRequired,
  isShuffleActive: propTypes.bool.isRequired,
};

export default MainControlsComponent;
