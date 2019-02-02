import INDICATE_UPDATE_AVAILABLE from '../actions/types/indicate-update-available.type';

const isUpdateAvailableReducer = (state = false, action) =>
  state || action.type === INDICATE_UPDATE_AVAILABLE;

export default isUpdateAvailableReducer;
