import React, { Component } from 'react';
import Tone from 'tone';
import {
  VolumeSlider,
  PlayButton,
  SoundOnButton,
  SoundOffButton,
  ControlDirection,
} from 'react-player-controls';
import './styles.scss';

const DEFAULT_VOLUME_PCT = 0.75;
const MAX_VOLUME = -15;
const MIN_VOLUME = -75;

const convertPctToDb = pct => pct * (MAX_VOLUME - MIN_VOLUME) + MIN_VOLUME;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      pieceLoaded: false,
      volume: DEFAULT_VOLUME_PCT,
      logs: [],
      masterVolumeNode: new Tone.Volume(
        convertPctToDb(DEFAULT_VOLUME_PCT)
      ).toMaster(),
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.log = this.log.bind(this);
  }
  render() {
    return (
      <div>
        <PlayButton onClick={this.handlePlayClick} isEnabled />
        <VolumeSlider
          direction={ControlDirection.Vertical}
          volume={this.state.volume}
          onVolumeChange={this.handleVolumeChange}
          isEnabled
        />
        <div>
          {this.state.logs.map((message, i) => <div key={i}>{message}</div>)}
        </div>
      </div>
    );
  }
  handlePlayClick() {
    this.props.piece(this.state.masterVolumeNode, this.log).then(() => {
      Tone.Transport.start('+1');
    });
  }
  log(message) {
    this.setState({ logs: this.state.logs.concat(message) });
  }
  handleVolumeChange(volume) {
    this.setState({ volume });
    this.updateVolume(volume);
  }
  updateVolume(volume) {
    this.state.masterVolumeNode.set({ volume: convertPctToDb(volume) });
  }
}

export default Player;
