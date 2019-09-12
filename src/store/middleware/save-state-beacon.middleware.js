import API_ENDPOINT from '@config/api-endpoint';
import stringify from './stringify-state';
import isOnline from '../get-online-status';

const saveStateBeaconMiddleware = store => next => {
  if (navigator.sendBeacon) {
    window.addEventListener('beforeunload', () => {
      if (isOnline()) {
        navigator.sendBeacon(
          `${API_ENDPOINT}/state`,
          stringify(store.getState())
        );
      }
    });
  }
  return action => next(action);
};

export default saveStateBeaconMiddleware;
