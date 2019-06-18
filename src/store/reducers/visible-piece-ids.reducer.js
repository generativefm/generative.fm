import CHANGE_FILTER from '../actions/types/change-filter.type';
import CHANGE_SORTING from '../actions/types/change-sorting.type';
import pieces from '@pieces';
import sortings from '@pieces/sortings';

const getSortedFilteredPieceIds = (filter, sorting, reduxState) => {
  let filteredPieces;
  if (filter === 'all') {
    filteredPieces = pieces;
  } else if (filter === 'favorites') {
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
    typeof reduxState.visiblePieceIds === 'undefined' ||
    typeof reduxState.sorting === 'undefined'
  ) {
    return getSortedFilteredPieceIds(
      'all',
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
