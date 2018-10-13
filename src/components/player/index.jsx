import React, { Component } from 'react';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import PropTypes from 'prop-types';
import VolumeControl from './volume-control';
import Controls from './controls';
import './styles.scss';

const DEFAULT_VOLUME_PCT = 75;
const MAX_VOLUME = 0;
const MIN_VOLUME = -50;
const SAVED_VOLUME_KEY = 'volume';

const convertPctToDb = pct =>
  (pct / 100) * (MAX_VOLUME - MIN_VOLUME) + MIN_VOLUME;

class Player extends Component {
  constructor(props) {
    super(props);
    const savedVolume = Number.parseFloat(
      localStorage.getItem(SAVED_VOLUME_KEY)
    );
    const startingVolume = Number.isNaN(savedVolume)
      ? DEFAULT_VOLUME_PCT
      : savedVolume;
    this.state = {
      isPlaying: false,
      sliderVolume: startingVolume,
      isMuted: false,
      isReady: false,
      masterVolumeNode: null,
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.handleUnmuteClick = this.handleUnmuteClick.bind(this);
  }
  render() {
    return (
      <div className="player">
        <div className="player__title">{this.props.piece.title}</div>
        <div className="player__volume">
          <VolumeControl
            pctFilled={this.state.sliderVolume}
            onChange={this.handleVolumeChange}
            isMuted={this.state.isMuted}
          />
        </div>
        <div className="player__controls">
          <Controls
            isReady={this.state.isReady}
            isPlaying={this.state.isPlaying}
            isMuted={this.state.isMuted}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    const masterVolumeNode = new Tone.Volume(
      convertPctToDb(this.state.sliderVolume)
    ).toMaster();
    this.props.piece
      //eslint-disable-next-line no-empty-function
      .makePiece(masterVolumeNode, () => {})
      .then(() => {
        this.setState({ isReady: true, masterVolumeNode });
      });
    startAudioContext(Tone.context);
  }
  handleClick() {
    if (this.state.isReady) {
      if (!this.state.isPlaying) {
        this.handlePlayClick();
      } else if (this.state.isMuted) {
        this.handleUnmuteClick();
      } else {
        this.handleMuteClick();
      }
    }
  }
  handlePlayClick() {
    Tone.Transport.start('+1');
    this.setState({ isPlaying: true });
  }
  handleMuteClick() {
    this.setState({
      isMuted: true,
    });
    this.state.masterVolumeNode.mute = true;
  }
  handleUnmuteClick() {
    this.setState({
      isMuted: false,
    });
    this.state.masterVolumeNode.mute = false;
    this.state.masterVolumeNode.set({
      volume: convertPctToDb(this.state.sliderVolume),
    });
  }
  handleVolumeChange(volume) {
    this.setState({ sliderVolume: Number.parseFloat(volume) });
    localStorage.setItem(SAVED_VOLUME_KEY, volume);
    if (
      this.state.masterVolumeNode !== null &&
      !this.state.masterVolumeNode.mute
    ) {
      this.state.masterVolumeNode.set({ volume: convertPctToDb(volume) });
    }
  }
  //eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    this.setState({ isReady: false, isPlaying: false });
  }
}

Player.propTypes = {
  piece: PropTypes.shape({
    makePiece: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Player;
