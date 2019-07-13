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
import makePlayPiece from './make-play-piece';
import convertPctToDb from './convert-pct-to-db';
import startAudioContext from './start-context';
import stopPerformances from './stop-performances';
import updatePlayTime from '../../actions/creators/update-play-time.creator';

const UPDATE_PLAY_TIME_INTERVAL_MS = 5000;

const piecesMiddleware = store => next => {
  Tone.context.latencyHint = 'balanced';
  let playTimeInterval;

  const startTrackingPlayTimeForPieceId = pieceId => {
    if (playTimeInterval) {
      clearInterval(playTimeInterval);
    }
    const { playTime } = store.getState();
    const adjustedStartTime =
      Date.now() - (playTime[pieceId] ? playTime[pieceId] : 0);
    playTimeInterval = setInterval(() => {
      store.dispatch(updatePlayTime(pieceId, Date.now() - adjustedStartTime));
    }, UPDATE_PLAY_TIME_INTERVAL_MS);
  };

  const performances = [];
  const playPiece = makePlayPiece(store, performances);

  const updateVolume = (isMuted, pctParam) => {
    let pct = pctParam;
    if (typeof pct === 'undefined') {
      const { volumePct } = store.getState();
      pct = volumePct;
    }
    const volume = convertPctToDb(pct);
    performances
      .filter(({ isStopped }) => !isStopped())
      .forEach(({ volumeNode }) => volumeNode.set({ volume, mute: isMuted }));
  };

  return action => {
    const {
      selectedPieceId,
      isPlaying,
      isShuffleActive,
      pieceHistory,
      isMuted,
      visiblePieceIds,
    } = store.getState();
    if (action.type === UPDATE_VOLUME_PCT) {
      updateVolume(false, action.payload);
    } else if (action.type === NEXT) {
      let nextPieceId;
      if (isShuffleActive) {
        const unselectedPieces = visiblePieceIds.filter(
          id => id !== selectedPieceId
        );
        nextPieceId =
          unselectedPieces[Math.floor(Math.random() * unselectedPieces.length)];
      } else {
        const selectedPieceIndex = visiblePieceIds.findIndex(
          id => id === selectedPieceId
        );
        if (
          selectedPieceIndex === -1 ||
          selectedPieceIndex === visiblePieceIds.length - 1
        ) {
          [nextPieceId] = visiblePieceIds;
        } else {
          nextPieceId = visiblePieceIds[selectedPieceIndex + 1];
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
          nextPieceId =
            visiblePieceIds[Math.floor(Math.random() * visiblePieceIds.length)];
        }
      } else {
        const selectedPieceIndex = visiblePieceIds.findIndex(
          id => id === selectedPieceId
        );
        if (selectedPieceIndex <= 0) {
          nextPieceId = visiblePieceIds[visiblePieceIds.length - 1];
        } else {
          nextPieceId = visiblePieceIds[selectedPieceIndex - 1];
        }
      }
      store.dispatch(selectPiece(nextPieceId));
    } else if (action.type === SELECT_PIECE) {
      if (isPlaying && action.payload !== selectedPieceId) {
        if (action.payload === null) {
          store.dispatch(stop());
        } else {
          const newPiece = pieces.find(({ id }) => id === action.payload);
          stopPerformances(performances, true);
          playPiece(newPiece);
          startTrackingPlayTimeForPieceId(newPiece.id);
        }
      }
    } else if (action.type === PLAY) {
      startAudioContext();
      let piece;
      if (selectedPieceId === null) {
        piece = isShuffleActive
          ? pieces[Math.floor(Math.random() * pieces.length)]
          : pieces[0];
        store.dispatch(selectPiece(piece.id));
      } else {
        piece = pieces.find(({ id }) => id === selectedPieceId);
      }
      playPiece(piece);
      startTrackingPlayTimeForPieceId(piece.id);
    } else if (action.type === STOP) {
      clearInterval(playTimeInterval);
      stopPerformances(performances, true);
    } else if (action.type === MUTE) {
      updateVolume(true);
    } else if (action.type === UNMUTE) {
      updateVolume(false);
    }
    return next(action);
  };
};

export default piecesMiddleware;
