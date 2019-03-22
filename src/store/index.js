import { createStore, applyMiddleware } from 'redux';
import { isMobile } from 'react-device-detect';
import rootReducer from './reducers/root.reducer';
import piecesMiddleware from './middleware/pieces.middleware';
import localStorageMiddleware from './middleware/local-storage.middleware';
import beforeUnloadMiddleware from './middleware/before-unload.middleware';
import STATE_STORAGE_KEY from './middleware/local-storage.middleware/key';
import getOnlineStatus from './get-online-status';
import pieces from '../pieces/index';

const MOBILE_VOLUME_PCT = 95;

const storedStateJSON = window.localStorage.getItem(STATE_STORAGE_KEY);
const storedState =
  typeof storedStateJSON === 'undefined' || storedStateJSON === null
    ? {}
    : JSON.parse(storedStateJSON);

if (!pieces.map(({ id }) => id).includes(storedState.selectedPieceId)) {
  delete storedState.selectedPieceId;
}

const initialState = Object.assign({}, storedState, {
  isPlaying: false,
  isUpdateAvailable: false,
  isOnline: getOnlineStatus(),
});

if (isMobile) {
  initialState.volumePct = MOBILE_VOLUME_PCT;
  initialState.isMuted = false;
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    piecesMiddleware,
    localStorageMiddleware,
    beforeUnloadMiddleware
  )
);

export default store;
