const handleBeforeUnload = event => {
  event.preventDefault();
  event.returnValue = '';
};

const beforeUnloadMiddleware = store => next => {
  let listening = false;
  return action => {
    const result = next(action);
    const { isPlaying } = store.getState();
    if (isPlaying && !listening) {
      listening = true;
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else if (listening) {
      listening = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    return result;
  };
};

export default beforeUnloadMiddleware;
