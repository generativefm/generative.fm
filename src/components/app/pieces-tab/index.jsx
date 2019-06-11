import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfinity,
  faPlay,
  faStop,
  faChevronLeft,
  faCircleNotch,
  faHeart,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import pieces from '../../../pieces';
import formatPlayTime from './format-play-time';
import defaultImage from '@images/default.png';
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
        {filteredPieces.map(piece => {
          const isSelected = piece.id === selectedPieceId;
          const isFavorite = favorites.has(piece.id);
          const handleButtonClick = event => {
            event.stopPropagation();
            if (isSelected) {
              if (isPlaying) {
                onStopClick();
              } else {
                onPlayClick();
              }
            } else if (isPlaying) {
              onPieceClick(piece);
            } else {
              onPieceClick(piece);
              onPlayClick();
            }
          };

          return (
            <div
              className="piece"
              key={piece.id}
              onClick={() => onPieceClick(piece)}
            >
              <div
                className="piece__image"
                onClick={
                  isPlaying
                    ? () => onPieceClick(piece)
                    : () => onPlayClick(piece)
                }
                title={isPlaying ? piece.title : `Play ${piece.title}`}
              >
                <img src={piece.image ? piece.image : defaultImage} />
                {isSelected && (isPlaying || isLoading) && (
                  <div
                    className={classNames(
                      'piece__image__is-playing-indicator',
                      {
                        'piece__image__is-playing-indicator--is-spinning': isLoading,
                      }
                    )}
                  >
                    <FontAwesomeIcon
                      icon={isLoading ? faCircleNotch : faInfinity}
                    />
                  </div>
                )}
              </div>
              <div className="piece__btns">
                <button
                  type="button"
                  className={classNames(
                    'piece__btns__btn',
                    'piece__btns__btn--heart',
                    {
                      'piece__btns__btn--heart--is-filled': isFavorite,
                    }
                  )}
                  onClick={
                    isFavorite
                      ? () => removeFavorite(piece.id)
                      : () => addFavorite(piece.id)
                  }
                  title={isFavorite ? 'Unfavorite' : 'Favorite'}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button
                  type="button"
                  className="piece__btns__btn"
                  onClick={
                    isPlaying ? () => onStopClick() : () => onPlayClick()
                  }
                  title={isPlaying ? 'Stop' : 'Play'}
                >
                  <FontAwesomeIcon
                    icon={isPlaying && isSelected ? faStop : faPlay}
                  />
                </button>
                <button
                  type="button"
                  className="piece__btns__btn"
                  title="More..."
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
              <div className="piece__info">
                <div className="piece__info__title">
                  <button
                    type="button"
                    className="btn--link"
                    onClick={() => onPieceClick(piece)}
                  >
                    {piece.title}
                  </button>
                </div>
                <div className="piece__info__tags">
                  {piece.tags.map((tag, i) =>
                    i === piece.tags.length - 1 ? (
                      <button type="button" className="btn--link" key={tag}>
                        {tag}
                      </button>
                    ) : (
                      <span key={tag}>
                        <button type="button" className="btn--link">
                          {tag}
                        </button>
                        ,{' '}
                      </span>
                    )
                  )}
                </div>
                <div className="piece__info__playtime">
                  {formatPlayTime(playTime[piece.id])}
                </div>
              </div>
            </div>
          );
        })}
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
