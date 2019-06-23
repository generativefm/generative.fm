import ADD_FAVORITE from '../actions/types/add-favorite.type';
import REMOVE_FAVORITE from '../actions/types/remove-favorite.type';

const favoritesReducer = (state = new Set(), action) => {
  if (action.type === ADD_FAVORITE) {
    return new Set([...state, action.payload]);
  } else if (action.type === REMOVE_FAVORITE) {
    return new Set([...state].filter(pieceId => pieceId !== action.payload));
  }
  return state;
};

export default favoritesReducer;
