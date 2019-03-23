import MARK_PIECE_BUILD_LOADING from '../actions/types/mark-piece-build-loading.type';
import MARK_PIECE_BUILD_LOADED from '../actions/types/mark-piece-build-loaded.type';

const loadingPieceBuildIdReducer = (state = '', action) => {
  if (action.type === MARK_PIECE_BUILD_LOADING) {
    return action.payload;
  } else if (
    action.type === MARK_PIECE_BUILD_LOADED &&
    state === action.payload
  ) {
    return '';
  }
  return state;
};

export default loadingPieceBuildIdReducer;
