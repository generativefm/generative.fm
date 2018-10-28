import SELECT_TRACK from '../actions/select-track.type';

const selectedTrackIdReducer = (state = null, action) => {
  if (action.type === SELECT_TRACK) {
    return action.payload;
  }
  return state;
};

export default selectedTrackIdReducer;
