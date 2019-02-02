const getOnlineStatus = () =>
  typeof navigator.onLine === 'undefined' || navigator.onLine;

export default getOnlineStatus;
