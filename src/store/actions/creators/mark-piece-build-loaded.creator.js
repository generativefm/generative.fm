import MARK_PIECE_BUILD_LOADED from '../types/mark-piece-build-loaded.type';

export default buildId => ({
  type: MARK_PIECE_BUILD_LOADED,
  payload: buildId,
});
