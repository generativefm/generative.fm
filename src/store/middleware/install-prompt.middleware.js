import PROMPT_INSTALLATION from '../actions/types/prompt-installation.type';
import setInstallableStatus from '../actions/creators/set-installable-status.creator';

const installPromptMiddleware = store => next => {
  let deferredEvent;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredEvent = event;
    store.dispatch(setInstallableStatus(true));
  });

  return action => {
    if (action.type === PROMPT_INSTALLATION) {
      if (typeof deferredEvent === 'undefined') {
        store.dispatch(setInstallableStatus(false));
      } else {
        deferredEvent.prompt();
        deferredEvent.userChoice.then(() => {
          store.dispatch(setInstallableStatus(false));
        });
      }
    }
    return next(action);
  };
};

export default installPromptMiddleware;
