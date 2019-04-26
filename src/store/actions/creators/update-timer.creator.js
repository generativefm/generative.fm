import UPDATE_TIMER from '../types/update-timer.type';

const updateTimer = deltaMS => ({ type: UPDATE_TIMER, payload: deltaMS });

export default updateTimer;
