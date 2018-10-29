import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.reducer';
import piecesMiddleware from './middleware/pieces.middleware';

const store = createStore(rootReducer, applyMiddleware(piecesMiddleware));

export default store;
