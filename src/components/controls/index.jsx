import React, { Component } from 'react';
import MainControlsComponent from './main-controls';
import CurrentlyPlayingComponent from './currently-playing';
import VolumeComponent from './volume';
import './controls.scss';

class ControlsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasSelection: false, isPlaying: false };
  }
  render() {
    return (
      <div className="controls">
        <div className="controls__currently-playing">
          <CurrentlyPlayingComponent trackTitle={'Eno Machine'} />
        </div>
        <MainControlsComponent
          className="controls__main-controls"
          hasSelection={this.state.hasSelection}
          isPlaying={this.state.isPlaying}
        />
        <div className="controls__volume">
          <VolumeComponent />
        </div>
      </div>
    );
  }
}

export default ControlsComponent;
