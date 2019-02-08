import UPDATE_PLAY_TIME from '../types/update-play-time.type';

const updatePlayTime = (selectedPieceId, playTime) => ({
  type: UPDATE_PLAY_TIME,
  payload: { selectedPieceId, playTime },
});

export default updatePlayTime;
