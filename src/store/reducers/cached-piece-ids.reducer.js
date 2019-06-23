import MARK_PIECE_BUILD_LOADED from '../actions/types/mark-piece-build-loaded.type';

const cachedPieceIdsReducer = (state = new Set(), action) =>
  action.type === MARK_PIECE_BUILD_LOADED
    ? new Set([...state, action.payload.pieceId])
    : state;

export default cachedPieceIdsReducer;
