import Tone from 'tone';
import uuid from 'uuid';
import stopPiece from './stop-piece';
import sampleFormat from '../../../config/sample-format';

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
    // most pieces between 0.1 and 0.3
    const meter = new Tone.Meter();
    pieceVol.connect(meter);
    let maxDb = -Infinity;
    const updateMaxDb = () => {
      const db = meter.getValue();
      if (db > maxDb) {
        maxDb = db;
      }
    };
    setInterval(() => {
      updateMaxDb();
    }, 0);
    setInterval(() => {
      console.log(maxDb);
    }, 1000);

    piece
      .makePiece({
        destination: pieceVol,
        audioContext: Tone.context,
        preferredFormat: sampleFormat,
      })
      .then(cleanUp => {
        piece.cleanUp = cleanUp;
        buildingPiece = false;
        piece.ready = true;
        const { selectedPieceId, isPlaying } = getState();
        if (lastBuildId === buildId && selectedPieceId === piece.id) {
          if (isPlaying) {
            piece.played = true;
            Tone.Transport.start();
          }
        } else {
          stopPiece(piece);
          playPiece(queuedPiece, getState);
        }
      });
  }
};

export default playPiece;
