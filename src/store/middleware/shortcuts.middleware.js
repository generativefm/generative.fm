import isRecordingGenerationInProgress from '@utils/is-recording-generation-in-progress';
import previous from '../actions/creators/previous.creator';
import next from '../actions/creators/next.creator';
import play from '../actions/creators/play.creator';
import stop from '../actions/creators/stop.creator';
import mute from '../actions/creators/mute.creator';
import unmute from '../actions/creators/unmute.creator';

const PREVIOUS_KEY = 'ArrowLeft';
const NEXT_KEY = 'ArrowRight';
const PLAY_STOP_KEY = ' ';
const MUTE_KEY = 'm';

const keyHandlers = {
  [PLAY_STOP_KEY]: ({ isPlaying }) => (isPlaying ? stop() : play()),
  [PREVIOUS_KEY]: () => previous(),
  [NEXT_KEY]: () => next(),
  [MUTE_KEY]: ({ isMuted }) => (isMuted ? unmute() : mute()),
};

const shortcutsMiddleware = store => nextMiddleware => {
  const handleKeydown = keyEvent => {
    const keyHandler = keyHandlers[keyEvent.key];
    if (typeof keyHandler === 'function') {
      keyEvent.preventDefault();
      const state = store.getState();
      if (!isRecordingGenerationInProgress(state.generatedRecordings)) {
        const reduxAction = keyHandler(state);
        store.dispatch(reduxAction);
      }
    }
  };
  window.addEventListener('keydown', handleKeydown);
  return action => nextMiddleware(action);
};

export default shortcutsMiddleware;
