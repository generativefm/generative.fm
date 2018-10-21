import React from 'react';
import propTypes from 'prop-types';
import VisualizerComponent from './visualizer';
import './currently-playing.scss';

const CurrentlyPlayingComponent = ({ trackTitle }) => (
  <div className="currently-playing">
    <div className="currently-playing__visualizer">
      <VisualizerComponent />
    </div>
    <div className="currently-playing__title">{trackTitle}</div>
  </div>
);

CurrentlyPlayingComponent.propTypes = {
  trackTitle: propTypes.string,
};

export default CurrentlyPlayingComponent;
