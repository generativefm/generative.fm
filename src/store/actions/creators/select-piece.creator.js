import SELECT_PIECE from '../types/select-piece.type';

const selectPiece = id => ({ type: SELECT_PIECE, payload: id });

export default selectPiece;
