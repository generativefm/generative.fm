import START_TIMER from '@store/actions/types/start-timer.type';
import UPDATE_TIMER from '@store/actions/types/update-timer.type';
import STOP from '@store/actions/types/stop.type';
import CANCEL_TIMER from '@store/actions/types/cancel-timer.type';

const MAX_TIME_MS = 10 * 60 * 60 * 1000;

const remainingMSReducer = (state = 0, action) => {
  switch (action.type) {
    case START_TIMER: {
      return action.payload;
    }
    case UPDATE_TIMER: {
      return Math.min(Math.max(state + action.payload, 0), MAX_TIME_MS);
    }
    case CANCEL_TIMER:
    case STOP: {
      return 0;
    }
    default: {
      return state;
    }
  }
};

export default remainingMSReducer;
