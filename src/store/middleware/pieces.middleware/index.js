import Tone from 'tone';
// import shuffleArray from 'shuffle-array';
// import ENABLE_SHUFFLE from '../actions/types/enable-shuffle.type';
// import DISABLE_SHUFFLE from '../actions/types/disable-shuffle.type';
import MUTE from '../../actions/types/mute.type';
import UNMUTE from '../../actions/types/unmute.type';
import NEXT from '../../actions/types/next.type';
import PREVIOUS from '../../actions/types/previous.type';
import UPDATE_VOLUME_PCT from '../../actions/types/update-volume-pct.type';
import PLAY from '../../actions/types/play.type';
import STOP from '../../actions/types/stop.type';
import SELECT_PIECE from '../../actions/types/select-piece.type';
import selectPiece from '../../actions/creators/select-piece.creator';
import stop from '../../actions/creators/stop.creator';
import pieces from '../../../pieces';
import playPiece from './play-piece';
import convertPctToDb from './convert-pct-to-db';
import stopPiece from './stop-piece';

const piecesMiddleware = store => next => action => {
  const { selectedPieceId, isPlaying } = store.getState();
  if (action.type === UPDATE_VOLUME_PCT) {
    Tone.Master.volume.value = convertPctToDb(action.payload);
    Tone.Master.mute = false;
  } else if (action.type === NEXT || action.type === PREVIOUS) {
    const currentPieceIndex = pieces.findIndex(
      ({ id }) => id === selectedPieceId
    );
    const nextPieceIndex = currentPieceIndex + (action.type === NEXT ? 1 : -1);
    if (nextPieceIndex >= 0 && nextPieceIndex < pieces.length) {
      const { id } = pieces[nextPieceIndex];
      store.dispatch(selectPiece(id));
    } else {
      store.dispatch(selectPiece(null));
    }
  } else if (action.type === SELECT_PIECE && isPlaying) {
    if (action.payload === null) {
      store.dispatch(stop());
    } else {
      const piece = pieces.find(({ id }) => id === action.payload);
      stopPiece();
      playPiece(piece, store.getState);
    }
  } else if (action.type === PLAY && selectedPieceId !== null) {
    const piece = pieces.find(({ id }) => id === selectedPieceId);
    playPiece(piece, store.getState);
  } else if (action.type === STOP) {
    stopPiece();
  } else if (action.type === MUTE) {
    Tone.Master.mute = true;
  } else if (action.type === UNMUTE) {
    Tone.Master.mute = false;
  }
  return next(action);
};

export default piecesMiddleware;
