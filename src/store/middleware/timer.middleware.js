import START_TIMER from '../actions/types/start-timer.type';
import STOP from '../actions/types/stop.type';
import CANCEL_TIMER from '../actions/types/cancel-timer.type';
import updateTimer from '../actions/creators/update-timer.creator';
import stop from '../actions/creators/stop.creator';
import play from '../actions/creators/play.creator';

const timerMiddleware = store => next => {
  let interval;
  let lastUpdate;
  let isRunning = false;

  const stopTimer = () => {
    isRunning = false;
    clearInterval(interval);
  };
  return action => {
    if (action.type === START_TIMER) {
      const { isPlaying } = store.getState();
      if (!isPlaying) {
        store.dispatch(play());
      }
      lastUpdate = Date.now();
      isRunning = true;
      interval = setInterval(() => {
        const now = Date.now();
        const elapsedSinceLastUpdate = now - lastUpdate;
        store.dispatch(updateTimer(-elapsedSinceLastUpdate));
        lastUpdate = now;
      }, 1000);
    } else if (action.type === STOP || action.type === CANCEL_TIMER) {
      stopTimer();
    }
    const result = next(action);
    if (isRunning) {
      const { timer } = store.getState();
      if (timer.remainingMS <= 0 && action.type !== CANCEL_TIMER) {
        store.dispatch(stop());
      }
    }

    return result;
  };
};

export default timerMiddleware;
