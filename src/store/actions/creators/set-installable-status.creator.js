import SET_INSTALLABLE_STATUS from '../types/set-set-installable-status.type';

const setInstallableStatus = status => ({
  type: SET_INSTALLABLE_STATUS,
  payload: status,
});

export default setInstallableStatus;
