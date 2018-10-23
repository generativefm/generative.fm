import React from 'react';
import propTypes from 'prop-types';
import VisualizerComponent from './visualizer';
import './currently-playing.scss';

const CurrentlyPlayingComponent = ({ trackTitle, hasSelection, isPlaying }) => (
  <div className="currently-playing">
    <div className="currently-playing__visualizer">
      {hasSelection && <VisualizerComponent isRunning={isPlaying} />}
    </div>
    <div className="currently-playing__title">
      {hasSelection ? trackTitle : ''}
    </div>
  </div>
);

CurrentlyPlayingComponent.propTypes = {
  trackTitle: propTypes.string,
  hasSelection: propTypes.bool.isRequired,
  isPlaying: propTypes.bool.isRequired,
};

export default CurrentlyPlayingComponent;
