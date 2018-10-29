import MUTE from '../actions/types/mute.type';
import UNMUTE from '../actions/types/unmute.type';
import UPDATE_VOLUME_PCT from '../actions/types/update-volume-pct.type';

const isMutedReducer = (state = false, action) => {
  switch (action.type) {
    case MUTE: {
      return true;
    }
    case UPDATE_VOLUME_PCT:
    case UNMUTE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default isMutedReducer;
