import React, { Component } from 'react';
import Tone from 'tone';
import startAudioContext from 'startaudiocontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faVolumeOff,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import VolumeControl from './volume-control';
import './styles.scss';

const DEFAULT_VOLUME_PCT = 0.75;
const MAX_VOLUME = 0;
const MIN_VOLUME = -50;
const SAVED_VOLUME_KEY = 'volume';

const convertPctToDb = pct => pct * (MAX_VOLUME - MIN_VOLUME) + MIN_VOLUME;

class Player extends Component {
  constructor(props) {
    super(props);
    const savedVolume = localStorage.getItem(SAVED_VOLUME_KEY);
    const startingVolume =
      savedVolume === null ? DEFAULT_VOLUME_PCT : savedVolume;
    this.state = {
      isPlaying: false,
      volume: startingVolume,
      sliderVolume: startingVolume,
      isMuted: false,
      ready: false,
      masterVolumeNode: new Tone.Volume(
        convertPctToDb(startingVolume)
      ).toMaster(),
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.handleUnmuteClick = this.handleUnmuteClick.bind(this);
  }
  render() {
    return (
      <div className="player">
        <div className="player__title">Title</div>
        <div className="player__volume">
          <VolumeControl />
        </div>
        <div className="player__controls">Controls</div>
      </div>
    );
  }
  componentDidMount() {
    this.props.piece
      //eslint-disable-next-line no-empty-function
      .makePiece(this.state.masterVolumeNode, () => {})
      .then(() => {
        this.setState({ ready: true });
      });
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
    this.updateVolume(0, false);
  }
  handleUnmuteClick() {
    this.setState({
      isMuted: false,
    });
    this.updateVolume(this.state.sliderVolume, false);
  }
  handleSliderChange(volume) {
    this.setState({ sliderVolume: volume });
    if (!this.state.isMuted) {
      this.updateVolume(volume);
    }
  }
  updateVolume(volume, save = true) {
    this.setState({ volume });
    if (save) {
      localStorage.setItem(SAVED_VOLUME_KEY, volume);
    }
    this.state.masterVolumeNode.set({ volume: convertPctToDb(volume) });
  }
  //eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    Tone.Transport.stop();
    Tone.context.close();
    Tone.context = new AudioContext();
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
