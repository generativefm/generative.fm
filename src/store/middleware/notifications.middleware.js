import allNotifications from '@notifications';
import addNotification from '../actions/creators/add-notification.creator';

const notificationsMiddleware = store => next => {
  let unTriggeredNotifications = Reflect.ownKeys(allNotifications).map(id =>
    Object.assign({ id }, allNotifications[id])
  );
  return action => {
    const result = next(action);
    const state = store.getState();
    const { notifications } = state;
    const triggeredNotificationIds = notifications.map(({ id }) => id);
    unTriggeredNotifications = unTriggeredNotifications.filter(
      ({ id }) => !triggeredNotificationIds.includes(id)
    );
    unTriggeredNotifications
      .filter(({ getIsTriggered }) => getIsTriggered(state))
      .forEach(({ id }) => store.dispatch(addNotification(id)));
    return result;
  };
};

export default notificationsMiddleware;
