import Tone from 'tone';
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
  const {
    selectedPieceId,
    isPlaying,
    isShuffleActive,
    pieceHistory,
    isMuted,
  } = store.getState();
  if (action.type === UPDATE_VOLUME_PCT) {
    Tone.Master.volume.value = convertPctToDb(action.payload);
    Tone.Master.mute = false;
  } else if (action.type === NEXT) {
    let nextPieceId;
    if (isShuffleActive) {
      const unselectedPieces = pieces.filter(
        ({ id }) => id !== selectedPieceId
      );
      nextPieceId =
        unselectedPieces[Math.floor(Math.random() * unselectedPieces.length)]
          .id;
    } else {
      const selectedPieceIndex = pieces.findIndex(
        ({ id }) => id === selectedPieceId
      );
      if (
        selectedPieceIndex === -1 ||
        selectedPieceIndex === pieces.length - 1
      ) {
        nextPieceId = pieces[0].id;
      } else {
        nextPieceId = pieces[selectedPieceIndex + 1].id;
      }
    }
    store.dispatch(selectPiece(nextPieceId));
  } else if (action.type === PREVIOUS) {
    let nextPieceId = null;
    if (isShuffleActive) {
      //the last entry in pieceHistory is the current piece
      if (pieceHistory.length > 1) {
        nextPieceId = pieceHistory[pieceHistory.length - 2];
      } else {
        nextPieceId = pieces[Math.floor(Math.random() * pieces.length)].id;
      }
    } else {
      const selectedPieceIndex = pieces.findIndex(
        ({ id }) => id === selectedPieceId
      );
      if (selectedPieceIndex <= 0) {
        nextPieceId = pieces[pieces.length - 1].id;
      } else {
        nextPieceId = pieces[selectedPieceIndex - 1].id;
      }
    }
    store.dispatch(selectPiece(nextPieceId));
  } else if (action.type === SELECT_PIECE) {
    if (isPlaying && action.payload !== selectedPieceId) {
      if (action.payload === null) {
        store.dispatch(stop());
      } else {
        const piece = pieces.find(({ id }) => id === action.payload);
        stopPiece();
        playPiece(piece, store.getState);
      }
    }
  } else if (action.type === PLAY) {
    if (!isMuted) {
      Tone.Master.mute = false;
    }
    let piece;
    if (selectedPieceId === null) {
      piece = isShuffleActive
        ? pieces[Math.floor(Math.random() * pieces.length)]
        : pieces[0];
      store.dispatch(selectPiece(piece.id));
    } else {
      piece = pieces.find(({ id }) => id === selectedPieceId);
    }
    playPiece(piece, store.getState);
  } else if (action.type === STOP) {
    Tone.Master.mute = true;
    stopPiece();
  } else if (action.type === MUTE) {
    Tone.Master.mute = true;
  } else if (action.type === UNMUTE && isPlaying) {
    Tone.Master.mute = false;
  }
  return next(action);
};

export default piecesMiddleware;
