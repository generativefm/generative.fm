import Tone from 'tone';
import stopPiece from './stop-piece';

//eslint-disable-next-line no-empty-function
const noop = () => {};

let buildingPiece = false;
let queuedPiece;

const playPiece = (piece, getState) => {
  queuedPiece = piece;
  if (!buildingPiece) {
    buildingPiece = true;
    piece.makePiece(Tone.Master, noop).then(() => {
      buildingPiece = false;
      const { selectedPieceId } = getState();
      if (selectedPieceId === piece.id) {
        Tone.Transport.start('+0.1');
      } else {
        stopPiece();
        playPiece(queuedPiece, getState);
      }
    });
  }
};

export default playPiece;
