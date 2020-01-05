import USER_SIGN_IN from '../actions/types/user-sign-in.type';
import USER_SIGN_OUT from '../actions/types/user-sign-out.type';

const isUserSignedInReducer = (state = false, action) => {
  switch (action.type) {
    case USER_SIGN_IN: {
      return true;
    }
    case USER_SIGN_OUT: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default isUserSignedInReducer;
