import START_TIMER from '@store/actions/types/start-timer.type';
import UPDATE_TIMER from '@store/actions/types/update-timer.type';

const remainingMSReducer = (state = 0, action) => {
  switch (action.type) {
    case START_TIMER: {
      return action.payload;
    }
    case UPDATE_TIMER: {
      return Math.max(state + action.payload, 0);
    }
    default: {
      return state;
    }
  }
};

export default remainingMSReducer;
