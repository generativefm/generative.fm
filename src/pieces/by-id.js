import pieces from './index';

const piecesById = pieces.reduce((byId, piece) => {
  const { id } = piece;
  byId[id] = piece;
  return byId;
}, {});

export default piecesById;
