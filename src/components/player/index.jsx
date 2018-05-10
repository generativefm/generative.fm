import React, { Component } from 'react';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
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
      volume: DEFAULT_VOLUME_PCT,
      sliderVolume: DEFAULT_VOLUME_PCT,
      isMuted: false,
      logs: [],
      masterVolumeNode: new Tone.Volume(
        convertPctToDb(DEFAULT_VOLUME_PCT)
      ).toMaster(),
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.handleUnmuteClick = this.handleUnmuteClick.bind(this);
  }
  render() {
    return (
      <div>
        {!this.state.isPlaying && (
          <PlayButton onClick={this.handlePlayClick} isEnabled />
        )}
        {this.state.isPlaying &&
          !this.state.isMuted && (
            <SoundOffButton onClick={this.handleMuteClick} isEnabled />
          )}
        {this.state.isPlaying &&
          this.state.isMuted && (
            <SoundOnButton onClick={this.handleUnmuteClick} isEnabled />
          )}
        {!this.state.isMuted && (
          <VolumeSlider
            direction={ControlDirection.Vertical}
            volume={this.state.sliderVolume}
            onVolumeChange={this.handleVolumeChange}
            isEnabled
          />
        )}
        <div>
          {this.state.logs.map((message, i) => <div key={i}>{message}</div>)}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.piece(this.state.masterVolumeNode, this.log.bind(this));
    startAudioContext(Tone.context);
  }
  handlePlayClick() {
    Tone.Transport.start('+1');
    this.setState({ isPlaying: true });
  }
  handleMuteClick() {
    this.setState({
      isMuted: true,
    });
    this.updateVolume(0);
  }
  handleUnmuteClick() {
    this.setState({
      isMuted: false,
    });
    this.updateVolume(this.state.sliderVolume);
  }
  log(message) {
    this.setState({ logs: this.state.logs.concat(message) });
  }
  handleVolumeChange(volume) {
    this.setState({ sliderVolume: volume });
    this.updateVolume(volume);
  }
  updateVolume(volume) {
    this.setState({ volume });
    this.state.masterVolumeNode.set({ volume: convertPctToDb(volume) });
  }
}

export default Player;
