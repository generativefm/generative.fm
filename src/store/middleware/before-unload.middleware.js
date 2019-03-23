import isProduction from '@config/is-production';

const handleBeforeUnload = event => {
  event.preventDefault();
  event.returnValue = '';
};

const beforeUnloadMiddleware = store => next => {
  let isListening = false;
  return action => {
    const result = next(action);
    const { isPlaying } = store.getState();
    if (isProduction && isPlaying && !isListening) {
      isListening = true;
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else if (isListening) {
      isListening = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    return result;
  };
};

export default beforeUnloadMiddleware;
