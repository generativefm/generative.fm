import { createStore, applyMiddleware } from 'redux';
import isMobile from '@config/is-mobile';
import rootReducer from './reducers/root.reducer';
import piecesMiddleware from './middleware/pieces.middleware';
import localStorageMiddleware from './middleware/local-storage.middleware';
import interruptUnloadMiddleware from './middleware/interrupt-unload.middleware';
import silentHtml5AudioMiddleware from './middleware/silent-html5-audio.middleware';
import mediaSessionMiddleware from './middleware/media-session.middleware';
import shortcutsMiddleware from './middleware/shortcuts.middleware';
import onlineStatusMiddleware from './middleware/online-status.middleware';
import recordingGenerationMiddleware from './middleware/recording-generation.middleware';
import timerMiddleware from './middleware/timer.middleware';
import notificationsMiddleware from './middleware/notifications.middleware';
import STATE_STORAGE_KEY from './middleware/local-storage.middleware/key';
import installPromptMiddleware from './middleware/install-prompt.middleware';
import castMiddleware from './middleware/cast.middleware';
import fetchStatsMiddleware from './middleware/fetch-stats.middleware';
import pieces from '../pieces/index';
import getInitialState from './get-initial-state';

const storedStateJSON = window.localStorage.getItem(STATE_STORAGE_KEY);
const storedState =
  typeof storedStateJSON === 'undefined' || storedStateJSON === null
    ? {}
    : JSON.parse(storedStateJSON);

if (!pieces.map(({ id }) => id).includes(storedState.selectedPieceId)) {
  delete storedState.selectedPieceId;
}

const initialState = getInitialState(storedState);

const allMiddlewares = [
  castMiddleware,
  timerMiddleware,
  piecesMiddleware,
  recordingGenerationMiddleware,
  silentHtml5AudioMiddleware,
  mediaSessionMiddleware,
  shortcutsMiddleware,
  onlineStatusMiddleware,
  notificationsMiddleware,
  installPromptMiddleware,
  fetchStatsMiddleware,
  localStorageMiddleware,
];
const desktopMiddlewares = allMiddlewares.concat([interruptUnloadMiddleware]);

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...(isMobile ? allMiddlewares : desktopMiddlewares))
);

export default store;
