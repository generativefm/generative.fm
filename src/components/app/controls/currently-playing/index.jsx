import React from 'react';
import propTypes from 'prop-types';
import VisualizerContainer from '../../../../containers/visualizer.container';
import pieces from '../../../../pieces';
import './currently-playing.scss';

const CurrentlyPlayingComponent = ({ selectedPieceId }) => {
  const hasSelection = selectedPieceId !== null;
  const { artist, title } = hasSelection
    ? pieces.find(({ id }) => id === selectedPieceId)
    : { artist: '', title: '' };
  return (
    <div className="currently-playing">
      <div className="currently-playing__visualizer">
        {hasSelection && <VisualizerContainer />}
      </div>
      <div className="currently-playing__info">
        <div className="currently-playing__info__title">{title}</div>
        <div className="currently-playing__info__artist">{artist}</div>
      </div>
    </div>
  );
};

CurrentlyPlayingComponent.propTypes = {
  selectedPieceId: propTypes.string,
};

export default CurrentlyPlayingComponent;
