import API_ENDPOINT from '@config/api-endpoint';
import isProduction from '@config/is-production';
import stringify from './stringify-state';
import isOnline from '../get-online-status';

const saveStateBeaconMiddleware = store => next => {
  if (navigator.sendBeacon && isProduction) {
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
