import React, { Component } from 'react';
import MainControlsComponent from './main-controls';
import CurrentlyPlayingComponent from './currently-playing';
import VolumeComponent from './volume';
import pieces from '../../pieces';
import './controls.scss';

class ControlsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pct: 75,
      displayPct: 75,
      isMuted: false,
      isShuffleActive: false,
      isRepeatActive: false,
    };
    this.onVolumeChange = pct =>
      this.setState({ pct, displayPct: pct, isMuted: false });
    this.onVolumeIconClick = () => {
      this.setState({
        isMuted: !this.state.isMuted,
        displayPct: this.state.isMuted ? this.state.pct : 0,
      });
    };
    this.onPrimaryClick = () => {
      this.setState({ isPlaying: !this.state.isPlaying });
    };
    this.onForwardClick = () => {};
    this.onBackClick = () => {};
    this.onShuffleClick = () =>
      this.setState({ isShuffleActive: !this.state.isShuffleActive });
    this.onRepeatClick = () =>
      this.setState({ isRepeatActive: !this.state.isRepeatActive });
  }
  render() {
    return (
      <div className="controls">
        <div className="controls__currently-playing">
          <CurrentlyPlayingComponent
            trackTitle={
              pieces.some(({ link }) => link === this.props.selectedTrackId)
                ? pieces.find(({ link }) => link === this.props.selectedTrackId)
                    .title
                : 'Untitled'
            }
            isPlaying={this.props.isPlaying}
            hasSelection={this.props.hasSelection}
          />
        </div>
        <MainControlsComponent
          className="controls__main-controls"
          hasSelection={this.props.hasSelection}
          isPlaying={this.props.isPlaying}
          onForwardClick={this.onForwardClick}
          onBackClick={this.onBackClick}
          onPrimaryClick={this.onPrimaryClick}
          onRepeatClick={this.onRepeatClick}
          onShuffleClick={this.onShuffleClick}
          isShuffleActive={this.state.isShuffleActive}
          isRepeatActive={this.state.isRepeatActive}
        />
        <div className="controls__volume">
          <VolumeComponent
            pct={this.state.displayPct}
            onChange={this.onVolumeChange}
            onIconClick={this.onVolumeIconClick}
            isPlaying={this.props.isPlaying}
            hasSelection={this.props.hasSelection}
          />
        </div>
      </div>
    );
  }
}

export default ControlsComponent;
