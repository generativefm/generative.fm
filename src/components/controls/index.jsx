import React, { Component } from 'react';
import MainControlsComponent from './main-controls';
import CurrentlyPlayingComponent from './currently-playing';
import VolumeComponent from './volume';
import './controls.scss';

class ControlsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSelection: true,
      isPlaying: true,
      pct: 75,
      displayPct: 75,
      isMuted: false,
    };
    this.onVolumeChange = pct =>
      this.setState({ pct, displayPct: pct, isMuted: false });
    this.onVolumeIconClick = () => {
      this.setState({
        isMuted: !this.state.isMuted,
        displayPct: this.state.isMuted ? this.state.pct : 0,
      });
    };
  }
  render() {
    return (
      <div className="controls">
        <div className="controls__currently-playing">
          <CurrentlyPlayingComponent
            trackTitle={'Eno Machine'}
            isPlaying={this.state.isPlaying}
            hasSelection={this.state.hasSelection}
          />
        </div>
        <MainControlsComponent
          className="controls__main-controls"
          hasSelection={this.state.hasSelection}
          isPlaying={this.state.isPlaying}
        />
        <div className="controls__volume">
          <VolumeComponent
            pct={this.state.displayPct}
            onChange={this.onVolumeChange}
            onIconClick={this.onVolumeIconClick}
            isPlaying={this.state.isPlaying}
            hasSelection={this.state.hasSelection}
          />
        </div>
      </div>
    );
  }
}

export default ControlsComponent;
