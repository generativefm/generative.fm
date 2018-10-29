import SELECT_PIECE from '../actions/types/select-piece.type';

const selectedPieceIdReducer = (state = null, action) => {
  if (action.type === SELECT_PIECE) {
    return action.payload;
  }
  return state;
};

export default selectedPieceIdReducer;
