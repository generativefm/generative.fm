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
} from '@fortawesome/free-solid-svg-icons';
import pieces from '../../../pieces';
import formatPlayTime from './format-play-time';
import defaultImage from '../../../pieces/images/default.png';
import artists from '../../../data/artists';
import './pieces-tab.scss';

const PiecesTabComponent = ({
  selectedPieceId,
  isPlaying,
  onPieceClick,
  onStopClick,
  onPlayClick,
  playTime,
  filter,
}) => {
  const filteredPieces = pieces.filter(
    ({ id, artist }) =>
      typeof filter !== 'string' || (id === filter || artist === filter)
  );
  return filteredPieces.length > 0 ? (
    <div className="pieces-tab">
      {typeof filter === 'string' && (
        <Link className="music-link" to="/">
          <FontAwesomeIcon icon={faChevronLeft} className="music-link__icon" />
          All Music
        </Link>
      )}
      {filteredPieces.map(piece => {
        const isSelected = piece.id === selectedPieceId;
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
            title={`${isPlaying ? 'Play' : 'Select'} ${piece.title}`}
          >
            <div className="piece__image">
              <img src={piece.image ? piece.image : defaultImage} />
              <button
                className="piece__image__button"
                onClick={handleButtonClick}
              >
                <FontAwesomeIcon
                  icon={isPlaying && isSelected ? faStop : faPlay}
                />
              </button>
              {isSelected &&
                isPlaying && (
                  <div className="piece__image__is-playing-indicator">
                    <FontAwesomeIcon icon={faInfinity} />
                  </div>
                )}
            </div>
            <div className="piece__info">
              <div className="piece__info__title">{piece.title}</div>
              <div className="piece__info__artist">{artists[piece.artist]}</div>
              <div className="piece__info__playtime">
                {formatPlayTime(playTime[piece.id])}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

PiecesTabComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  playTime: propTypes.object.isRequired,
  filter: propTypes.string,
};

export default PiecesTabComponent;
