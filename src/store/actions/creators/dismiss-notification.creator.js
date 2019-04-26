import DISMISS_NOTIFICATION from '../types/dismiss-notification.type';

const dismissNotification = notificationId => ({
  type: DISMISS_NOTIFICATION,
  payload: notificationId,
});

export default dismissNotification;
