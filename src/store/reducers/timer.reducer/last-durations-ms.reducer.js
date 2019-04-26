import START_TIMER from '@store/actions/types/start-timer.type';

const DEFAULT_DURATIONS_MS = [15 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000];

const lastDurationsMSReducer = (state = DEFAULT_DURATIONS_MS, action) =>
  action.type === START_TIMER
    ? [
        action.payload,
        ...state.filter(duration => duration !== action.payload),
      ].slice(0, DEFAULT_DURATIONS_MS.length)
    : state;

export default lastDurationsMSReducer;
