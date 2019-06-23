import ADD_FAVORITE from '../types/add-favorite.type';

const addFavorite = pieceId => ({ type: ADD_FAVORITE, payload: pieceId });

export default addFavorite;
