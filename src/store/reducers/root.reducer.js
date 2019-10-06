import { combineReducers } from 'redux';
import isMuted from './is-muted.reducer';
import isPlaying from './is-playing.reducer';
import selectedPieceId from './selected-piece-id.reducer';
import volumePct from './volume-pct.reducer';
import isShuffleActive from './is-shuffle-active.reducer';
import pieceHistory from './piece-history.reducer';
import isUpdateAvailable from './is-update-available.reducer';
import version from './version.reducer';
import isOnline from './is-online.reducer';
import playTime from './play-time.reducer';
import stateId from './state-id.reducer';
import loadingPieceBuildId from './loading-piece-build-id.reducer';
import generatedRecordings from './generated-recordings.reducer';
import lastRecordingGenerationLength from './last-recording-generation-length.reducer';
import timer from './timer.reducer';
import notifications from './notifications.reducer';
import favorites from './favorites.reducer';
import filter from './filter.reducer';
import sorting from './sorting.reducer';
import visiblePieceIdsReducer from './visible-piece-ids.reducer';
import isInstallable from './is-installable.reducer';
import cachedPieceIds from './cached-piece-ids.reducer';
import globalPlayTime from './global-play-time.reducer';
import favoriteCount from './favorite-count.reducer';

const combinedReducer = combineReducers({
  isMuted,
  isPlaying,
  selectedPieceId,
  volumePct,
  isShuffleActive,
  pieceHistory,
  isUpdateAvailable,
  version,
  isOnline,
  playTime,
  stateId,
  loadingPieceBuildId,
  generatedRecordings,
  lastRecordingGenerationLength,
  timer,
  notifications,
  favorites,
  filter,
  sorting,
  isInstallable,
  cachedPieceIds,
  globalPlayTime,
  favoriteCount,
});

const rootReducer = (state = {}, action) => {
  const combinedState = Object.assign({}, state);
  const { visiblePieceIds } = combinedState;
  delete combinedState.visiblePieceIds;
  const newCombinedState = combinedReducer(combinedState, action);
  const newVisiblePieceIds = visiblePieceIdsReducer(
    Object.assign(newCombinedState, { visiblePieceIds }),
    action
  );
  return Object.assign(newCombinedState, {
    visiblePieceIds: newVisiblePieceIds,
  });
};

export default rootReducer;
