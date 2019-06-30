import pieces from '@pieces';
import sortings from '@pieces/sortings';
import FAVORITES_FILTER from '@config/favorites-filter';
import ALL_FILTER from '@config/all-filter';

const getSortedFilteredPieceIds = (
  reduxState,
  filterParam = reduxState.filter,
  sortingParam = reduxState.sorting
) => {
  let filteredPieces;
  const filter = typeof filterParam === 'undefined' ? ALL_FILTER : filterParam;
  const sorting =
    typeof sortingParam === 'undefined'
      ? { key: 'releaseDate', isReversed: false }
      : sortingParam;
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

export default getSortedFilteredPieceIds;
