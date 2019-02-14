import Tone from 'tone';
import uuid from 'uuid';
import stopPiece from './stop-piece';

//eslint-disable-next-line no-empty-function
const noop = () => {};

let lastBuildId;
let buildingPiece = false;
let queuedPiece;

const playPiece = (piece, getState) => {
  queuedPiece = piece;
  const buildId = uuid();
  lastBuildId = buildId.slice(0);
  if (!buildingPiece) {
    piece.ready = false;
    buildingPiece = true;
    const pieceVol = new Tone.Volume().toMaster();
    piece.volumeNode = pieceVol;

    // METERING
    // const meter = new Tone.Meter();
    // pieceVol.connect(meter);
    // let maxDb = -Infinity;
    // const updateMaxDb = () => {
    //   const db = meter.getValue();
    //   if (db > maxDb) {
    //     maxDb = db;
    //   }
    // };
    // setInterval(() => {
    //   updateMaxDb();
    // }, 0);
    // setInterval(() => {
    //   console.log(maxDb);
    // }, 1000);

    piece.makePiece(pieceVol, noop).then(cleanUp => {
      piece.cleanUp = cleanUp;
      buildingPiece = false;
      piece.ready = true;
      const { selectedPieceId, isPlaying } = getState();
      if (lastBuildId === buildId && selectedPieceId === piece.id) {
        if (isPlaying) {
          piece.played = true;
          Tone.Transport.start('+0.1');
        }
      } else {
        stopPiece(piece);
        playPiece(queuedPiece, getState);
      }
    });
  }
};

export default playPiece;
