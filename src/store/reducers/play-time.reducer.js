import UPDATE_PLAY_TIME from '../actions/types/update-play-time.type';

const playTimeReducer = (state = {}, action) =>
  action.type === UPDATE_PLAY_TIME
    ? Object.assign({}, state, {
        [action.payload.selectedPieceId]: action.payload.playTime,
      })
    : state;

export default playTimeReducer;
