import isMobile from '@config/is-mobile';
import getOnlineStatus from '@utils/get-online-status';
import objToMap from '@utils/obj-to-map';
import getSortedFilteredPieceIds from './get-sorted-filtered-piece-ids';
import { version } from '../../package.json';

const MOBILE_VOLUME_PCT = 95;

const getInitialState = storedState => {
  const isNewVersion = storedState.version === version;
  const initialState = Object.assign({}, storedState, {
    isPlaying: false,
    isUpdateAvailable: false,
    isOnline: getOnlineStatus(),
    loadingPieceBuildId: '',
    generatedRecordings:
      typeof storedState.generatedRecordings === 'object'
        ? Reflect.ownKeys(storedState.generatedRecordings)
            .filter(
              recordingId =>
                storedState.generatedRecordings[recordingId].url === ''
            )
            .reduce((generatedRecordings, recordingId) => {
              const recording = storedState.generatedRecordings[recordingId];
              generatedRecordings[recordingId] = Object.assign(recording, {
                url: '',
                isInProgress: false,
              });
              return generatedRecordings;
            }, {})
        : {},
    timer: Object.assign({}, storedState.timer, { remainingMS: 0 }),
    favorites: new Set(storedState.favorites),
    isInstallable: false,
    cachedPieceIds: isNewVersion
      ? new Set(storedState.cachedPieceIds)
      : new Set(),
  });

  if (typeof storedState.globalPlayTime === 'object') {
    initialState.globalPlayTime = objToMap(storedState.globalPlayTime);
  }

  if (typeof storedState.favoriteCount === 'object') {
    initialState.favoriteCount = objToMap(storedState.favoriteCount);
  }

  // must be done after previous step (converting favorites to Set)
  initialState.visiblePieceIds = getSortedFilteredPieceIds(initialState);

  if (isMobile) {
    initialState.volumePct = MOBILE_VOLUME_PCT;
    initialState.isMuted = false;
    initialState.isShuffleActive = false;
  }
  return initialState;
};

export default getInitialState;
