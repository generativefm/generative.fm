import KEY from './key';

const stringify = state =>
  JSON.stringify(
    Object.assign({}, state, {
      favorites: [...state.favorites],
      cachedPieceIds: [...state.cachedPieceIds],
    })
  );

const localStorageMiddleware = store => next => action => {
  const previousStateString = stringify(store.getState());
  const result = next(action);
  const nextStateString = stringify(store.getState());
  if (previousStateString !== nextStateString) {
    window.localStorage.setItem(KEY, nextStateString);
  }
  return result;
};

export default localStorageMiddleware;
