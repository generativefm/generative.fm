import API_ENDPOINT from '@config/api-endpoint';
import isProduction from '@config/is-production';
import updateGlobalPlayTime from '@store/actions/creators/update-global-play-time.creator';
import updateFavoriteCount from '@store/actions/creators/update-favorite-count.creator';
import isOnline from '@utils/get-online-status';
import objToMap from '@utils/obj-to-map';
import pipe from '@utils/pipe';

const lastPlayTimeFetchKey = 'LAST_PLAY_TIME_FETCH';
const lastFavoriteCountFetchKey = 'LAST_FAVORITE_COUNT_FETCH';

const getTimeStampFromLocalStorage = key => Number(localStorage.getItem(key));

const fetchStatsMiddleware = store => next => action => {
  const result = next(action);
  let playTimeFetching = false;
  let favoriteCountFetching = false;

  const { sorting } = store.getState();

  if (isProduction && isOnline()) {
    if (sorting.key === 'globalPlayTime' || sorting.key === 'trending') {
      const lastPlayTimeFetch = getTimeStampFromLocalStorage(
        lastPlayTimeFetchKey
      );
      if (
        !playTimeFetching &&
        Date.now() - lastPlayTimeFetch > 1000 * 60 * 60 * 24
      ) {
        playTimeFetching = true;
        fetch(`${API_ENDPOINT}/playtime`)
          .then(resp => resp.json())
          .then(({ Item }) => {
            playTimeFetching = false;
            localStorage.setItem(lastPlayTimeFetchKey, Date.now());
            pipe(
              JSON.parse,
              objToMap,
              updateGlobalPlayTime,
              store.dispatch
            )(Item.json.S);
          })
          .catch(() => {
            playTimeFetching = false;
          });
      }
    } else if (sorting.key === 'favoriteCount') {
      const lastFavoriteCountFetch = getTimeStampFromLocalStorage(
        lastFavoriteCountFetchKey
      );
      if (
        !favoriteCountFetching &&
        Date.now() - lastFavoriteCountFetch > 1000 * 60 * 60 * 24
      ) {
        favoriteCountFetching = true;
        fetch(`${API_ENDPOINT}/favoritecount`)
          .then(resp => resp.json())
          .then(({ Item }) => {
            favoriteCountFetching = false;
            localStorage.setItem(lastFavoriteCountFetchKey, Date.now());
            pipe(
              JSON.parse,
              objToMap,
              updateFavoriteCount,
              store.dispatch
            )(Item.json.S);
          })
          .catch(() => {
            favoriteCountFetching = false;
          });
      }
    }
  }

  return result;
};

export default fetchStatsMiddleware;
