import Tone from 'tone';
import sampleFormat from '@config/sample-format';
import markPieceBuildLoading from '../../actions/creators/mark-piece-build-loading.creator';
import markPieceBuildLoaded from '../../actions/creators/mark-piece-build-loaded.creator';
import performance from './performance';
import stopPerformances from './stop-performances';

let lastBuildId;
let isPerformanceBuilding = false;
let queuedPiece = null;

const sampleSource =
  location.hostname === 'localhost'
    ? {
        baseUrl: './',
      }
    : {};

const makePlayPiece = (store, performances) => {
  const playPiece = piece => {
    if (!isPerformanceBuilding) {
      queuedPiece = null;
      isPerformanceBuilding = true;
      const pieceVol = new Tone.Volume().toMaster();
      const piecePerformance = performance(piece, pieceVol);
      performances.push(piecePerformance);
      lastBuildId = piecePerformance.performanceId;
      store.dispatch(markPieceBuildLoading(piecePerformance.performanceId));

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
          piecePerformance.addCleanupFn(cleanUp);
          piecePerformance.isLoaded = true;
          isPerformanceBuilding = false;
          const { selectedPieceId, isPlaying } = store.getState();
          store.dispatch(markPieceBuildLoaded(piecePerformance.performanceId));
          if (
            lastBuildId === piecePerformance.performanceId &&
            selectedPieceId === piece.id &&
            isPlaying
          ) {
            Tone.Transport.start();
          } else {
            stopPerformances(performances);
          }
          if (isPlaying && queuedPiece !== null) {
            playPiece(queuedPiece, store);
          }
        });
    } else {
      queuedPiece = piece;
    }
  };
  return playPiece;
};

export default makePlayPiece;
