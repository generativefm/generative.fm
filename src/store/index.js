import { createStore, applyMiddleware } from 'redux';
import isMobile from '@config/is-mobile';
import rootReducer from './reducers/root.reducer';
import piecesMiddleware from './middleware/pieces.middleware';
import localStorageMiddleware from './middleware/local-storage.middleware';
import beforeUnloadMiddleware from './middleware/before-unload.middleware';
import silentHtml5AudioMiddleware from './middleware/silent-html5-audio.middleware';
import mediaSessionMiddleware from './middleware/media-session.middleware';
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
  loadingPieceBuildId: '',
});

if (isMobile) {
  initialState.volumePct = MOBILE_VOLUME_PCT;
  initialState.isMuted = false;
}

const allMiddlewares = [
  piecesMiddleware,
  silentHtml5AudioMiddleware,
  mediaSessionMiddleware,
  localStorageMiddleware,
];
const desktopMiddlewares = allMiddlewares.concat([beforeUnloadMiddleware]);

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...(isMobile ? allMiddlewares : desktopMiddlewares))
);

export default store;
