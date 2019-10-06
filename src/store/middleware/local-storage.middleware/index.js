import KEY from './key';
import stringify from '@utils/stringify-state';

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
