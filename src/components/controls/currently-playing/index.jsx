import React from 'react';
import propTypes from 'prop-types';
import VisualizerComponent from './visualizer';
import './currently-playing.scss';

const CurrentlyPlayingComponent = ({ trackTitle, hasSelection }) => (
  <div className="currently-playing">
    <div className="currently-playing__visualizer">
      {hasSelection && <VisualizerComponent isRunning={false} />}
    </div>
    <div className="currently-playing__title">
      {hasSelection ? trackTitle : ''}
    </div>
  </div>
);

CurrentlyPlayingComponent.propTypes = {
  trackTitle: propTypes.string,
  hasSelection: propTypes.bool,
};

CurrentlyPlayingComponent.defaultProps = {
  hasSelection: false,
};

export default CurrentlyPlayingComponent;
