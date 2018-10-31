import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.reducer';
import piecesMiddleware from './middleware/pieces.middleware';
import localStorageMiddleware from './middleware/local-storage.middleware';
import STATE_STORAGE_KEY from './middleware/local-storage.middleware/key';

const storedStateJSON = window.localStorage.getItem(STATE_STORAGE_KEY);
const storedState =
  typeof storedStateJSON === 'undefined' ? {} : JSON.parse(storedStateJSON);

const initialState = Object.assign({}, storedState, { isPlaying: false });

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(piecesMiddleware, localStorageMiddleware)
);

export default store;
