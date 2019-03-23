import isProduction from '@config/is-production';

const handleBeforeUnload = event => {
  event.preventDefault();
  event.returnValue = '';
  return '';
};

const beforeUnloadMiddleware = store => next => {
  let isListening = false;
  if (isProduction) {
    return action => {
      const result = next(action);
      const { isPlaying } = store.getState();
      if (isPlaying) {
        if (!isListening) {
          isListening = true;
          window.addEventListener('beforeunload', handleBeforeUnload);
        }
      } else if (isListening) {
        isListening = false;
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }

      return result;
    };
  }
  return action => next(action);
};

export default beforeUnloadMiddleware;
