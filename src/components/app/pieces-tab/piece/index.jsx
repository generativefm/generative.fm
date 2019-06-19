import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfinity,
  faPlay,
  faStop,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '@components/shared/icon-button';
import FavoriteButton from '@containers/favorite-button.container';
import MoreButton from '@components/shared/more-button';
import formatPlayTime from './format-play-time';
import LinkButton from '@components/shared/link-button';
import defaultImage from '@images/default.png';
import './piece.scss';

const Piece = ({
  piece,
  playTime,
  isSelected,
  isPlaying,
  isLoading,
  onPieceClick,
  onPlayClick,
  onStopClick,
  changeFilter,
}) => {
  const handlePieceClick = () => {
    if (!isSelected) {
      onPieceClick(piece);
    }
    if (!isPlaying) {
      onPlayClick();
    }
  };

  return (
    <div className="piece" key={piece.id}>
      <div
        className="piece__image"
        onClick={handlePieceClick}
        title={`Play ${piece.title}`}
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
        <FavoriteButton className="piece__btns__btn" pieceId={piece.id} />
        <IconButton
          className="piece__btns__btn"
          faIcon={isSelected && (isPlaying || isLoading) ? faStop : faPlay}
          onClick={
            isSelected && (isPlaying || isLoading)
              ? () => onStopClick()
              : handlePieceClick
          }
          title={isPlaying ? 'Stop' : `Play ${piece.title}`}
        />
        <MoreButton className="piece__btns__btn" pieceId={piece.id} />
      </div>
      <div className="piece__info">
        <div className="piece__info__title">
          <LinkButton
            className="piece__info__title__btn"
            onClick={handlePieceClick}
            title={`Play ${piece.title}`}
          >
            {piece.title}
          </LinkButton>
        </div>
        <div className="piece__info__tags">
          {piece.tags.map((tag, i) =>
            i === piece.tags.length - 1 ? (
              <LinkButton
                key={tag}
                title={`View ${tag} pieces`}
                onClick={() => changeFilter(tag)}
              >
                {tag}
              </LinkButton>
            ) : (
              <span key={tag}>
                <LinkButton
                  className="btn--link"
                  title={`View ${tag} pieces`}
                  onClick={() => changeFilter(tag)}
                >
                  {tag}
                </LinkButton>
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
  isLoading: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  changeFilter: propTypes.func.isRequired,
};

export default Piece;
