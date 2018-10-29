import React from 'react';
import MainControlsContainer from '../../../containers/main-controls.container';
import CurrentlyPlayingContainer from '../../../containers/currently-playing.container';
import VolumeContainer from '../../../containers/volume.container';
import './controls.scss';

const ControlsComponent = () => {
  return (
    <div className="controls">
      <div className="controls__currently-playing">
        <CurrentlyPlayingContainer />
      </div>
      <MainControlsContainer className="controls__main-controls" />
      <div className="controls__volume">
        <VolumeContainer />
      </div>
    </div>
  );
};

export default ControlsComponent;
