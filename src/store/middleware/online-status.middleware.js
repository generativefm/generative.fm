import setOnlineStatus from '../actions/creators/set-online-status.creator';

const setOnlineStatusMiddleware = store => next => {
  const makeSetOnlineStatus = online => () =>
    store.dispatch(setOnlineStatus(online));

  window.addEventListener('online', makeSetOnlineStatus(true));
  window.addEventListener('offline', makeSetOnlineStatus(false));

  return action => next(action);
};

export default setOnlineStatusMiddleware;
