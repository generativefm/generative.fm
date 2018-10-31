import ENABLE_SHUFFLE from '../actions/types/enable-shuffle.type';
import DISABLE_SHUFFLE from '../actions/types/disable-shuffle.type';
import makeToggleReducer from './utils/make-toggle-reducer';

export default makeToggleReducer(ENABLE_SHUFFLE, DISABLE_SHUFFLE, false);
