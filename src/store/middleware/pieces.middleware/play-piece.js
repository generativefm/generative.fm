import Tone from 'tone';
import stopPiece from './stop-piece';

//eslint-disable-next-line no-empty-function
const noop = () => {};

let currentPiece;
let currentPieceBuild = Promise.resolve();

const playPiece = (piece, getState) => {
  console.log(`Play ${piece.id}`);
  currentPiece = piece;
  currentPieceBuild.then(() => {
    currentPieceBuild = piece.makePiece(Tone.Master, noop).then(() => {
      const { selectedPieceId, isPlaying } = getState();
      if (selectedPieceId !== piece.id) {
        stopPiece();
        playPiece(currentPiece, getState);
      } else if (isPlaying) {
        Tone.Transport.start('+0.1');
      }
    });
  });
};

export default playPiece;
