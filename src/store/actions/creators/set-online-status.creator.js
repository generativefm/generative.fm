import SET_ONLINE_STATUS from '../types/set-online-status.type';

const setOnlineStatus = online => ({
  type: SET_ONLINE_STATUS,
  payload: online,
});

export default setOnlineStatus;
