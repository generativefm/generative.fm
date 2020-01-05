import { Auth } from 'aws-amplify';
import USER_SIGN_IN from '../../actions/types/user-sign-in.type';
import USER_SIGN_OUT from '../../actions/types/user-sign-out.type';
import ADD_FAVORITE from '../../actions/types/add-favorite.type';
import REMOVE_FAVORITE from '../../actions/types/remove-favorite.type';
import UPDATE_PLAY_TIME from '../../actions/types/update-play-time.type';
import userSignOut from '../../actions/creators/user-sign-out.creator';
import favoritesKey from './favorites-key';
import playTimeKey from './play-time-key';
import sync from './sync';

const MAX_PLAY_TIME_SYNC_INTERVAL_MS = 5 * 60 * 1000;

const syncMiddleware = store => next => {
  let isSyncing = false;
  let lastSyncTimeMs = 0;

  const getCredentialsAndSync = () => {
    isSyncing = true;
    Auth.currentCredentials()
      .catch(() => store.dispatch(userSignOut()))
      .then(credentials =>
        sync(credentials, store).then(() => {
          lastSyncTimeMs = Date.now();
        })
      )
      .finally(() => {
        isSyncing = false;
      });
  };

  return action => {
    const { isOnline, isUserSignedIn } = store.getState();
    if (action.type === USER_SIGN_OUT) {
      localStorage.removeItem(playTimeKey);
      localStorage.removeItem(favoritesKey);
    } else if (
      isOnline &&
      !isSyncing &&
      (action.type === USER_SIGN_IN ||
        (isUserSignedIn &&
          ([ADD_FAVORITE, REMOVE_FAVORITE].includes(action.type) ||
            (action.type === UPDATE_PLAY_TIME &&
              Date.now() - lastSyncTimeMs >= MAX_PLAY_TIME_SYNC_INTERVAL_MS))))
    ) {
      const result = next(action);
      console.log('syncing...');
      getCredentialsAndSync();
      return result;
    }
    return next(action);
  };
};

export default syncMiddleware;
