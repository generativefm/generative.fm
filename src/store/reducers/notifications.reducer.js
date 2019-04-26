import notifications from '@notifications';
import ADD_NOTIFICATION from '../actions/types/add-notification.type';
import DISMISS_NOTIFICATION from '../actions/types/dismiss-notification.type';

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const { message, link } = notifications[action.payload];
      return [
        ...state,
        { message, link, id: action.payload, isDismissed: false },
      ];
    }
    case DISMISS_NOTIFICATION: {
      const newState = state.slice(0);
      const notification = newState.find(({ id }) => id === action.payload);
      notification.isDismissed = true;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default notificationsReducer;
