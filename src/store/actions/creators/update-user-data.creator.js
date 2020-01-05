import UPDATE_USER_DATA from '../types/update-user-data.type';

export default newUserData => ({
  type: UPDATE_USER_DATA,
  payload: newUserData,
});
