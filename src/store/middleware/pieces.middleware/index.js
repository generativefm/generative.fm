import Tone from 'tone';
// import shuffleArray from 'shuffle-array';
// import ENABLE_SHUFFLE from '../actions/types/enable-shuffle.type';
// import DISABLE_SHUFFLE from '../actions/types/disable-shuffle.type';
import NEXT from '../../actions/types/next.type';
import PREVIOUS from '../../actions/types/previous.type';
import UPDATE_VOLUME_PCT from '../../actions/types/update-volume-pct.type';
import selectPiece from '../../actions/creators/select-piece.creator';
import pieces from '../../../pieces';
import playPiece from './play-piece';
import convertPctToDb from './convert-pct-to-db';

const piecesMiddleware = store => next => action => {
  const { selectedPieceId } = store.getState();
  if (action.type === NEXT || action.type === PREVIOUS) {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    const currentPieceIndex = pieces.findIndex(
      ({ id }) => id === selectedPieceId
    );
    const nextPieceIndex = currentPieceIndex + (action.type === NEXT ? 1 : -1);
    if (nextPieceIndex >= 0 && nextPieceIndex < pieces.length) {
      const piece = pieces[nextPieceIndex];
      playPiece(piece);
      store.dispatch(selectPiece(piece.id));
    } else {
      store.dispatch(selectPiece(null));
    }
  } else if (action.type === UPDATE_VOLUME_PCT) {
    Tone.Master.volume.value = convertPctToDb(action.payload);
  }
  return next(action);
};

export default piecesMiddleware;
