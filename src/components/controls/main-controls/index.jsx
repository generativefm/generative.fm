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

const MainControlsComponent = ({ isPlaying, hasSelection }) => {
  const PrimaryButtonComponent = isPlaying
    ? makePrimaryButton(faStop, () => ({}))
    : makePrimaryButton(faPlay, () => ({}));
  return (
    <div className="main-controls">
      <ButtonSpacerComponent />
      {hasSelection ? (
        <ControlButtonComponent faIcon={faStepBackward} onClick={() => ({})} />
      ) : (
        <ButtonSpacerComponent />
      )}
      <PrimaryButtonComponent />
      <ControlButtonComponent faIcon={faStepForward} onClick={() => ({})} />
      <ControlButtonComponent
        faIcon={faRandom}
        onClick={() => ({})}
        isActive={true}
      />
    </div>
  );
};

MainControlsComponent.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  hasSelection: propTypes.bool.isRequired,
};

export default MainControlsComponent;
