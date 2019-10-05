import FAVORITES_FILTER from '@config/favorites-filter';
import getSortedFilteredPieceIds from '@store/get-sorted-filtered-piece-ids';
import CHANGE_FILTER from '../actions/types/change-filter.type';
import CHANGE_SORTING from '../actions/types/change-sorting.type';
import ADD_FAVORITE from '../actions/types/add-favorite.type';
import REMOVE_FAVORITE from '../actions/types/remove-favorite.type';
import UPDATE_FAVORITE_COUNT from '../actions/types/update-favorite-count.type';
import UPDATE_GLOBAL_PLAY_TIME from '../actions/types/update-global-play-time.type';

// this reducer is given the entire state object, not just its slice
// however, it should only return its particular slice of the state
const visiblePieceIdsReducer = (reduxState = {}, action) => {
  if (action.type === CHANGE_FILTER) {
    return getSortedFilteredPieceIds(reduxState, action.payload);
  } else if (action.type === CHANGE_SORTING) {
    const { filter } = reduxState;
    return getSortedFilteredPieceIds(reduxState, filter, action.payload);
  } else if (
    reduxState.filter === FAVORITES_FILTER &&
    [ADD_FAVORITE, REMOVE_FAVORITE].includes(action.type)
  ) {
    return getSortedFilteredPieceIds(reduxState);
  } else if (
    (action.type === UPDATE_FAVORITE_COUNT &&
      reduxState.sorting.key === 'favoriteCount') ||
    (action.type === UPDATE_GLOBAL_PLAY_TIME &&
      (reduxState.sorting.key === 'globalPlayTime' ||
        reduxState.sorting.key === 'trending'))
  ) {
    return getSortedFilteredPieceIds(reduxState);
  } else if (
    typeof reduxState.visiblePieceIds === 'undefined' ||
    typeof reduxState.sorting === 'undefined'
  ) {
    return getSortedFilteredPieceIds(reduxState);
  }
  return reduxState.visiblePieceIds;
};

export default visiblePieceIdsReducer;
