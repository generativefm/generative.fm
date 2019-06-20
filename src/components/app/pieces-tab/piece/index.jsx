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
  isDisabled = false,
}) => {
  const handlePieceClick = () => {
    if (!isDisabled) {
      if (!isSelected) {
        onPieceClick(piece);
      }
      if (!isPlaying) {
        onPlayClick();
      }
    }
  };

  let centerButtonTitle;
  let primaryTitle = `Select ${piece.title}`;
  if (isDisabled) {
    centerButtonTitle = 'This piece is not currently available';
    primaryTitle = centerButtonTitle;
  } else if (isPlaying) {
    centerButtonTitle = 'Stop';
    primaryTitle = `${piece.title} is playing`;
  } else {
    centerButtonTitle = `Play ${piece.title}`;
    primaryTitle = `Play ${piece.title}`;
  }

  return (
    <div
      className={classNames('piece', { 'piece--is-disabled': isDisabled })}
      key={piece.id}
    >
      <div
        className="piece__image"
        onClick={handlePieceClick}
        title={primaryTitle}
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
          title={centerButtonTitle}
          isDisabled={isDisabled}
        />
        <MoreButton className="piece__btns__btn" pieceId={piece.id} />
      </div>
      <div className="piece__info">
        <div className="piece__info__title">
          <LinkButton
            className={classNames('piece__info__title__btn', {
              'piece__info__title__btn--is-disabled': isDisabled,
            })}
            onClick={handlePieceClick}
            title={primaryTitle}
            isDisabled={isDisabled}
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
  isLoading: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  changeFilter: propTypes.func.isRequired,
  isDisabled: propTypes.bool,
};

export default Piece;
