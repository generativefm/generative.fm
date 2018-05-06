import React, { Component } from 'react';
import Tone from 'tone';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const DEFAULT_VOLUME = -25;
const MAX_VOLUME = -15;
const MIN_VOLUME = -75;

const dbToPct = db =>
  `${Math.round((db - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME) * 100)}%`;

const start = () => {
  Tone.Transport.start('+1');
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      volume: DEFAULT_VOLUME,
      masterVolumeNode: new Tone.Volume(DEFAULT_VOLUME).toMaster(),
    };
    props.piece(this.state.masterVolumeNode).then(() => {
      this.setState({ ready: true });
    });
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }
  render() {
    return (
      <div>
        {this.state.ready && (
          <button type="button" onClick={start}>
            Start
          </button>
        )}
        <Slider
          min={MIN_VOLUME}
          max={MAX_VOLUME}
          value={this.state.volume}
          orientation="vertical"
          onChange={this.handleSliderChange}
          format={dbToPct}
        />
        <div className="value">{dbToPct(this.state.volume)}</div>
      </div>
    );
  }
  handleSliderChange(volume) {
    this.setState({ volume });
    this.updateVolume(volume);
  }
  updateVolume(volume) {
    this.state.masterVolumeNode.set({ volume });
  }
}

export default Player;
