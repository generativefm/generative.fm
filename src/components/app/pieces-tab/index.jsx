import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import pieces from '../../../pieces';
import formatPlayTime from './format-play-time';
import defaultImage from '../../../pieces/images/default.png';
import './pieces-tab.scss';

const PiecesTabComponent = ({
  selectedPieceId,
  isPlaying,
  onPieceClick,
  onStopClick,
  onPlayClick,
  playTime,
}) => {
  return (
    <div className="pieces-tab">
      {pieces.map(piece => {
        const isSelected = piece.id === selectedPieceId;
        const handleButtonClick = event => {
          event.stopPropagation();
          if (isSelected) {
            if (isPlaying) {
              onStopClick();
            } else {
              onPlayClick();
            }
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
              <div className="piece__info__artist">Alex Bainter</div>
              <div className="piece__info__playtime">
                {formatPlayTime(playTime[piece.id])}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

PiecesTabComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  playTime: propTypes.object.isRequired,
};

export default PiecesTabComponent;
