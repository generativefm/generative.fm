import UPDATE_GLOBAL_PLAY_TIME from '../types/update-global-play-time.type';

const updateGlobalPlayTime = payload => ({
  type: UPDATE_GLOBAL_PLAY_TIME,
  payload,
});

export default updateGlobalPlayTime;
