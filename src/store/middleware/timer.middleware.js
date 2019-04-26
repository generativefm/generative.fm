import START_TIMER from '../actions/types/start-timer.type';
import STOP from '../actions/types/stop.type';
import updateTimer from '../actions/creators/update-timer.creator';
import stop from '../actions/creators/stop.creator';
import play from '../actions/creators/play.creator';

const timerMiddleware = store => next => {
  let interval;
  let lastUpdate;
  return action => {
    if (action.type === START_TIMER) {
      const { isPlaying } = store.getState();
      if (!isPlaying) {
        store.dispatch(play());
      }
      lastUpdate = Date.now();
      interval = setInterval(() => {
        const now = Date.now();
        const elapsedSinceLastUpdate = now - lastUpdate;
        const { timer } = store.getState();
        if (timer.remainingMS <= elapsedSinceLastUpdate) {
          clearInterval(interval);
          store.dispatch(stop());
        }
        store.dispatch(updateTimer(-elapsedSinceLastUpdate));
        lastUpdate = now;
      }, 1000);
    } else if (action.type === STOP) {
      clearInterval(interval);
    }
    next(action);
  };
};

export default timerMiddleware;
