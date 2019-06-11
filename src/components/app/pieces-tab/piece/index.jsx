import React, { useState } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfinity,
  faPlay,
  faStop,
  faCircleNotch,
  faHeart,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-tiny-popover';
import formatPlayTime from './format-play-time';
import defaultImage from '@images/default.png';
import './piece.scss';

const execCommandCopy = text => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const clipboardApiCopy = text => navigator.clipboard.writeText(text);

const copyFn = navigator.clipboard ? clipboardApiCopy : execCommandCopy;

const Piece = ({
  piece,
  playTime,
  isSelected,
  isPlaying,
  isDisabled,
  isFavorite,
  isLoading,
  onPieceClick,
  onPlayClick,
  onStopClick,
  addFavorite,
  removeFavorite,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const copyLinkToClipboard = () => {
    const link = `${location.origin}/music/${piece.id}`;
    copyFn(link);
    setIsMenuOpen(false);
  };

  return (
    <div className="piece" key={piece.id} onClick={() => onPieceClick(piece)}>
      <div
        className="piece__image"
        onClick={
          isPlaying ? () => onPieceClick(piece) : () => onPlayClick(piece)
        }
        title={isPlaying ? piece.title : `Play ${piece.title}`}
      >
        <img src={piece.image ? piece.image : defaultImage} />
        {isSelected && (isPlaying || isLoading) && (
          <div
            className={classNames('piece__image__is-playing-indicator', {
              'piece__image__is-playing-indicator--is-spinning': isLoading,
            })}
          >
            <FontAwesomeIcon icon={isLoading ? faCircleNotch : faInfinity} />
          </div>
        )}
      </div>
      <div className="piece__btns">
        <button
          type="button"
          className={classNames('piece__btns__btn', 'piece__btns__btn--heart', {
            'piece__btns__btn--heart--is-filled': isFavorite,
          })}
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
          onClick={isPlaying ? () => onStopClick() : () => onPlayClick()}
          title={isPlaying ? 'Stop' : 'Play'}
        >
          <FontAwesomeIcon icon={isPlaying && isSelected ? faStop : faPlay} />
        </button>
        <Popover
          isOpen={isMenuOpen}
          onClickOutside={() => setIsMenuOpen(false)}
          content={
            <div className="piece__btns__menu">
              <button
                type="button"
                className="piece__btns__menu__btn"
                onClick={() => copyLinkToClipboard()}
              >
                Copy link to piece
              </button>
            </div>
          }
          align="end"
          disableReposition="true"
          padding="-30"
          transitionDuration="0"
        >
          <button
            type="button"
            className="piece__btns__btn"
            title="More..."
            onClick={
              isMenuOpen
                ? () => setIsMenuOpen(false)
                : () => setIsMenuOpen(true)
            }
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </Popover>
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
        <div className="piece__info__playtime">{formatPlayTime(playTime)}</div>
      </div>
    </div>
  );
};

Piece.propTypes = {
  piece: propTypes.object.isRequired,
  playTime: propTypes.number,
  isSelected: propTypes.bool.isRequired,
  isPlaying: propTypes.bool.isRequired,
  isDisabled: propTypes.bool.isRequired,
  isFavorite: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  addFavorite: propTypes.func.isRequired,
  removeFavorite: propTypes.func.isRequired,
};

export default Piece;
