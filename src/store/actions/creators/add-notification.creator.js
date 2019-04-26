import ADD_NOTIFICATION from '../types/add-notification.type';

const addNotification = notificationId => ({
  type: ADD_NOTIFICATION,
  payload: notificationId,
});

export default addNotification;
