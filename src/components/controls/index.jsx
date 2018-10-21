import React, { Component } from 'react';
import MainControlsComponent from './main-controls';
import CurrentlyPlayingComponent from './currently-playing';
import './controls.scss';

class ControlsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasSelection: false, isPlaying: false };
  }
  render() {
    return (
      <div className="controls">
        <CurrentlyPlayingComponent trackTitle={'Eno Machine'} />
        <MainControlsComponent
          hasSelection={this.state.hasSelection}
          isPlaying={this.state.isPlaying}
        />
      </div>
    );
  }
}

export default ControlsComponent;
