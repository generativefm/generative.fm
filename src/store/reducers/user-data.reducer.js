import USER_SIGN_OUT from '../actions/types/user-sign-out.type';
import UPDATE_USER_DATA from '../actions/types/update-user-data.type';

const getEmptyData = () => ({ favorites: [], playTime: {} });

const userDataReducer = (state = getEmptyData(), action) => {
  switch (action.type) {
    case USER_SIGN_OUT: {
      return getEmptyData();
    }
    case UPDATE_USER_DATA: {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export default userDataReducer;
