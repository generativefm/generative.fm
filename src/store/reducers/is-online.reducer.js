import SET_ONLINE_STATUS from '../actions/types/set-online-status.type';
import getOnlineStatus from '../get-online-status';

const isOnlineReducer = (state = getOnlineStatus(), action) =>
  action.type === SET_ONLINE_STATUS ? action.payload : state;

export default isOnlineReducer;
