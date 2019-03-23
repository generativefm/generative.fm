import MARK_PIECE_BUILD_LOADING from '../types/mark-piece-build-loading.type';

export default buildId => ({
  type: MARK_PIECE_BUILD_LOADING,
  payload: buildId,
});
