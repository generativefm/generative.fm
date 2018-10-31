import UPDATE_VOLUME_PCT from '../actions/types/update-volume-pct.type';

const DEFAULT_VOLUME_PCT = 85;

const updateVolumeReducer = (state = DEFAULT_VOLUME_PCT, action) => {
  if (action.type === UPDATE_VOLUME_PCT) {
    return action.payload;
  }
  return state;
};

export default updateVolumeReducer;
