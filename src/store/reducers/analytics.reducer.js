import START_TIMER from '../actions/types/start-timer.type';
import NEXT from '../actions/types/next.type';
import PREVIOUS from '../actions/types/previous.type';
import UPDATE_TIMER from '../actions/types/update-timer.type';
import CANCEL_TIMER from '../actions/types/cancel-timer.type';

const updateCount = (state, propName) =>
  Object.assign({}, state, {
    [propName]: (state[propName] || 0) + 1,
  });

const analyticsReducer = (state = {}, action) => {
  switch (action.type) {
    case START_TIMER: {
      const { payload: durationMs } = action;
      const newState = updateCount(state, 'timerStartCount');
      newState.timerDurationCounts = updateCount(
        newState.timerDurationCounts || {},
        durationMs
      );
      return newState;
    }
    case UPDATE_TIMER: {
      const { payload: deltaMs, meta } = action;
      if (!meta || !meta.isUserUpdate) {
        return state;
      }
      const newState = updateCount(state, 'timerUpdateCount');
      newState.timerDeltaCounts = updateCount(
        newState.timerDeltaCounts || {},
        deltaMs
      );
      return newState;
    }
    case CANCEL_TIMER: {
      return updateCount(state, 'timerCancelCount');
    }
    case NEXT: {
      return updateCount(state, 'nextCount');
    }
    case PREVIOUS: {
      return updateCount(state, 'previousCount');
    }
    default: {
      return state;
    }
  }
};

export default analyticsReducer;
