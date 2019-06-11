import REMOVE_FAVORITE from '../types/remove-favorite.type';

const removeFavorite = pieceId => ({ type: REMOVE_FAVORITE, payload: pieceId });

export default removeFavorite;
