import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import pieces from '@pieces';
import Piece from './piece';
import './pieces-tab.scss';

const PiecesTabComponent = ({
  selectedPieceId,
  isPlaying,
  onPieceClick,
  onStopClick,
  onPlayClick,
  playTime,
  filter,
  isLoading,
  isRecordingGenerationInProgress,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const filteredPieces = pieces.filter(
    ({ id, artist }) =>
      typeof filter !== 'string' || (id === filter || artist === filter)
  );
  if (
    !isPlaying &&
    filteredPieces.length === 1 &&
    filteredPieces[0].id !== selectedPieceId
  ) {
    onPieceClick(filteredPieces[0]);
  }

  return filteredPieces.length > 0 ? (
    <div className="pieces-tab">
      {typeof filter === 'string' && (
        <div className="music-link">
          <Link to="/">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="music-link__icon"
            />
            All Music
          </Link>
        </div>
      )}
      <div className="pieces">
        {filteredPieces.map(piece => (
          <Piece
            key={piece.id}
            piece={piece}
            playTime={playTime[piece.id]}
            isSelected={selectedPieceId === piece.id}
            isPlaying={isPlaying}
            isDisabled={isRecordingGenerationInProgress}
            isFavorite={favorites.has(piece.id)}
            isLoading={isLoading}
            onPieceClick={onPieceClick}
            onPlayClick={onPlayClick}
            onStopClick={onStopClick}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

PiecesTabComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  isRecordingGenerationInProgress: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  playTime: propTypes.object.isRequired,
  isLoading: propTypes.bool.isRequired,
  filter: propTypes.string,
};

export default PiecesTabComponent;
