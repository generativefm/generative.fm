import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import pieces from '@pieces';
import LinkButton from '@components/shared/link-button';
import Dropdown from './drop-down';
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
      <div className="filter-bar">
        <span>
          viewing{' '}
          <Dropdown selected="all" options={['all', 'favorites', 'poop']} />{' '}
          sorted by <LinkButton>release date</LinkButton> (
          <LinkButton>newest first</LinkButton>)
        </span>
      </div>
      <div className="pieces-container">
        <div className="pieces">
          {filteredPieces.map(piece => (
            <Piece
              key={piece.id}
              piece={piece}
              playTime={playTime[piece.id]}
              isSelected={selectedPieceId === piece.id}
              isPlaying={isPlaying}
              isDisabled={isRecordingGenerationInProgress}
              isLoading={isLoading}
              onPieceClick={onPieceClick}
              onPlayClick={onPlayClick}
              onStopClick={onStopClick}
            />
          ))}
        </div>
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
