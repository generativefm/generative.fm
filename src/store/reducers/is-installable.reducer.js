import SET_INSTALLABLE_STATUS from '../actions/types/set-installable-status.type';

const isInstallableReducer = (state = false, action) =>
  action.type === SET_INSTALLABLE_STATUS ? action.payload : state;

export default isInstallableReducer;
