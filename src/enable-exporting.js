import setImported from './store/actions/creators/set-imported.creator';
import STATE_STORAGE_KEY from './store/middleware/local-storage.middleware/key';
import store from './store';

const enableExporting = () => {
  let openerOrigin;
  switch (location.origin) {
    case 'https://generative.fm': {
      openerOrigin = 'https://play.generative.fm';
      break;
    }
    case 'https://staging.generative.fm': {
      openerOrigin = 'https://staging.play.generative.fm';
      break;
    }
    case 'http://localhost:9999': {
      openerOrigin = 'http://localhost:8080';
      break;
    }
    default: {
      // do nothing
    }
  }

  if (!openerOrigin) {
    return;
  }
  window.addEventListener('message', event => {
    const { data, source, origin } = event;
    if (origin !== openerOrigin) {
      return;
    }
    if (data.type === 'export-request') {
      const state = window.localStorage.getItem(STATE_STORAGE_KEY);
      source.postMessage({ type: 'export', state }, origin);
      return;
    }
    if (data.type === 'set-import-request') {
      store.dispatch(setImported());
      source.postMessage({ type: 'import-set' }, origin);
    }
  });
};

export default enableExporting;
