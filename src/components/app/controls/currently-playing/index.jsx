import React from 'react';
import propTypes from 'prop-types';
import VisualizerContainer from '../../../../containers/visualizer.container';
import pieces from '../../../../pieces';
import './currently-playing.scss';

const CurrentlyPlayingComponent = ({ selectedPieceId }) => {
  const hasSelection = selectedPieceId !== null;
  return (
    <div className="currently-playing">
      <div className="currently-playing__visualizer">
        {hasSelection && <VisualizerContainer />}
      </div>
      <div className="currently-playing__title">
        {hasSelection
          ? pieces.find(({ id }) => id === selectedPieceId).title
          : ''}
      </div>
    </div>
  );
};

CurrentlyPlayingComponent.propTypes = {
  selectedPieceId: propTypes.string,
};

export default CurrentlyPlayingComponent;
