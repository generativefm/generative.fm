import ENABLE_REPEAT from '../actions/types/enable-repeat.type';
import DISABLE_REPEAT from '../actions/types/disable-repeat.type';
import makeToggleReducer from './utils/make-toggle-reducer';

export default makeToggleReducer(ENABLE_REPEAT, DISABLE_REPEAT, false);
