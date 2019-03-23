import Tone from 'tone';
import uuid from 'uuid';
import sampleFormat from '@config/sample-format';
import markPieceBuildLoading from '../../actions/creators/mark-piece-build-loading.creator';
import markPieceBuildLoaded from '../../actions/creators/mark-piece-build-loaded.creator';
import stopPiece from './stop-piece';

let lastBuildId;
let buildingPiece = false;
let queuedPiece;

const sampleSource =
  location.hostname === 'localhost'
    ? {
        baseUrl: './',
      }
    : {};

const playPiece = (piece, store) => {
  queuedPiece = piece;
  const buildId = uuid();
  lastBuildId = buildId.slice(0);
  if (!buildingPiece) {
    store.dispatch(markPieceBuildLoading(buildId));
    piece.ready = false;
    buildingPiece = true;
    const pieceVol = new Tone.Volume().toMaster();
    piece.volumeNode = pieceVol;

    // METERING
    // most pieces between 0.1 and 0.3
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

    piece
      .makePiece({
        destination: pieceVol,
        audioContext: Tone.context,
        preferredFormat: sampleFormat,
        sampleSource,
      })
      .then(cleanUp => {
        piece.cleanUp = cleanUp;
        buildingPiece = false;
        piece.ready = true;
        const { selectedPieceId, isPlaying } = store.getState();
        if (lastBuildId === buildId && selectedPieceId === piece.id) {
          if (isPlaying) {
            store.dispatch(markPieceBuildLoaded(lastBuildId));
            piece.played = true;
            Tone.Transport.start();
          }
        } else {
          stopPiece(piece);
          playPiece(queuedPiece, store);
        }
      });
  }
};

export default playPiece;
