import MARK_PIECE_BUILD_LOADED from '../types/mark-piece-build-loaded.type';

export default ({ performanceId, piece }) => ({
  type: MARK_PIECE_BUILD_LOADED,
  payload: { performanceId, pieceId: piece.id },
});
