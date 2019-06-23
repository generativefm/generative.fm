import CHANGE_FILTER from '../actions/types/change-filter.type';
import CHANGE_SORTING from '../actions/types/change-sorting.type';
import ADD_FAVORITE from '../actions/types/add-favorite.type';
import REMOVE_FAVORITE from '../actions/types/remove-favorite.type';
import pieces from '@pieces';
import sortings from '@pieces/sortings';
import FAVORITES_FILTER from '@config/favorites-filter';
import ALL_FILTER from '@config/all-filter';

const getSortedFilteredPieceIds = (filter, sorting, reduxState) => {
  let filteredPieces;
  if (filter === ALL_FILTER) {
    filteredPieces = pieces;
  } else if (filter === FAVORITES_FILTER) {
    filteredPieces = pieces.filter(({ id }) => reduxState.favorites.has(id));
  } else {
    filteredPieces = pieces.filter(({ tags }) => tags.includes(filter));
  }
  const sortedPieces = sortings[sorting.key].fn(filteredPieces, reduxState);
  return (sorting.isReversed ? sortedPieces.reverse() : sortedPieces).map(
    ({ id }) => id
  );
};

// this reducer is given the entire state object, not just its slice
// however, it should only return its particular slice of the state
const visiblePieceIdsReducer = (reduxState = {}, action) => {
  if (action.type === CHANGE_FILTER) {
    const { sorting } = reduxState;
    return getSortedFilteredPieceIds(action.payload, sorting, reduxState);
  } else if (action.type === CHANGE_SORTING) {
    const { filter } = reduxState;
    return getSortedFilteredPieceIds(filter, action.payload, reduxState);
  } else if (
    reduxState.filter === FAVORITES_FILTER &&
    [ADD_FAVORITE, REMOVE_FAVORITE].includes(action.type)
  ) {
    const { filter, sorting } = reduxState;
    return getSortedFilteredPieceIds(filter, sorting, reduxState);
  } else if (
    typeof reduxState.visiblePieceIds === 'undefined' ||
    typeof reduxState.sorting === 'undefined'
  ) {
    return getSortedFilteredPieceIds(
      ALL_FILTER,
      { key: 'releaseDate', isReversed: false },
      reduxState
    );
  }
  const { sorting } = reduxState;
  if (sorting.key === 'playTime') {
    const { filter } = reduxState;
    return getSortedFilteredPieceIds(filter, sorting, reduxState);
  }
  return reduxState.visiblePieceIds;
};

export default visiblePieceIdsReducer;
