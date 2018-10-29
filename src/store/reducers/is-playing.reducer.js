import PLAY from '../actions/types/play.type';
import STOP from '../actions/types/stop.type';
import makeToggleReducer from './utils/make-toggle-reducer';

export default makeToggleReducer(PLAY, STOP, false);
