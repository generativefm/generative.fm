import { combineReducers } from 'redux';
import lastDurationsMS from './last-durations-ms.reducer';
import remainingMS from './remaining-ms.reducer';

const timerReducer = combineReducers({ lastDurationsMS, remainingMS });

export default timerReducer;
