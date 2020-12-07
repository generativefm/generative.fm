import UPDATE_TIMER from '../types/update-timer.type';

const updateTimer = (deltaMS, isUserUpdate = false) => ({
  type: UPDATE_TIMER,
  payload: deltaMS,
  meta: { isUserUpdate },
});

export default updateTimer;
