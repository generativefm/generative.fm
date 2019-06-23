import React from 'react';
import propTypes from 'prop-types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import IconButton from './icon-button';

const FavoriteButton = ({
  pieceId,
  favorites,
  addFavorite,
  removeFavorite,
  className,
}) => {
  const isFavorite = favorites.has(pieceId);
  return (
    <IconButton
      faIcon={faHeart}
      onClick={
        isFavorite ? () => removeFavorite(pieceId) : () => addFavorite(pieceId)
      }
      title={isFavorite ? 'Unfavorite' : 'Favorite'}
      isFilled={isFavorite}
      className={className}
    />
  );
};

FavoriteButton.propTypes = {
  pieceId: propTypes.string.isRequired,
  favorites: propTypes.object.isRequired,
  addFavorite: propTypes.func.isRequired,
  removeFavorite: propTypes.func.isRequired,
  className: propTypes.string,
};

export default FavoriteButton;
