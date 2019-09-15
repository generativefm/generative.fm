import isProduction from '@config/is-production';

const handleBeforeUnload = event => {
  event.preventDefault();
  event.returnValue = '';
  return '';
};

const interruptUnloadMiddleware = store => next => {
  let isListening = false;
  if (isProduction) {
    return action => {
      const result = next(action);
      const { isPlaying, generatedRecordings } = store.getState();
      const isRecordingInProgress = Reflect.ownKeys(generatedRecordings).some(
        recordingId => generatedRecordings[recordingId].isInProgress
      );
      if (isPlaying || isRecordingInProgress) {
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

export default interruptUnloadMiddleware;
