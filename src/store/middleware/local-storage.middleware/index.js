import KEY from './key';

const localStorageMiddleware = store => next => action => {
  const previousStateString = JSON.stringify(store.getState());
  const result = next(action);
  const nextStateString = JSON.stringify(store.getState());
  if (previousStateString !== nextStateString) {
    window.localStorage.setItem(KEY, nextStateString);
  }
  return result;
};

export default localStorageMiddleware;
