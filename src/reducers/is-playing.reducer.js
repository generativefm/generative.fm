import PLAY from '../actions/play.type';
import STOP from '../actions/stop.type';

const isPlayingReducer = (state = false, action) => {
  switch (action.type) {
    case PLAY: {
      return true;
    }
    case STOP: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default isPlayingReducer;
