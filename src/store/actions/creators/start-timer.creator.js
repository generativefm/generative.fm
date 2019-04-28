import START_TIMER from '../types/start-timer.type';

const startTimer = durationMS => ({ type: START_TIMER, payload: durationMS });

export default startTimer;
