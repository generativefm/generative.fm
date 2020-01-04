import { CognitoSync, CognitoIdentityCredentials } from 'aws-sdk';
import userPoolId from '@config/cognito-user-pool-id';
import identityPoolId from '@config/cognito-identity-poolid';

const DATASET_NAME = 'SYNC_DATA';
const FAVORITES_KEY = `${DATASET_NAME}_FAVORITES`;
const PLAY_TIME_KEY = `${DATASET_NAME}_PLAY_TIME`;

const getCognitoSync = (identityId, idJwtToken) =>
  new CognitoSync({
    credentials: new CognitoIdentityCredentials(
      {
        IdentityId: identityId,
        Logins: {
          [`cognito-idp.us-west-2.amazonaws.com/${userPoolId}`]: idJwtToken,
        },
      },
      { region: 'us-west-2' }
    ),
    params: { IdentityPoolId: identityPoolId, IdentityId: identityId },
    region: 'us-west-2',
    apiVersion: '2014-06-30',
  });

const getJSONFromLocalStorage = (key, defaultValue) => {
  const jsonStr = localStorage.get(key);
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    return defaultValue;
  }
};

const getStringFromDataset = (records, key, defaultValue) => {
  const record = records.find(({ Key }) => Key === key);
  if (!record) {
    return JSON.stringify(defaultValue);
  }
  return record.Value;
};

const getJSONFromDataset = (records, key, defaultValue) => {
  const record = records.find(({ Key }) => Key === key);
  if (!record) {
    return [defaultValue, 0];
  }
  try {
    return [JSON.parse(record.Value), record.SyncCount];
  } catch (err) {
    return [defaultValue, 0];
  }
};

const sync = (currentUserInfo, currentSession, reduxState) => {
  const cognitoSync = getCognitoSync(
    currentUserInfo.id,
    currentSession.idToken.jwtToken
  );
  return cognitoSync
    .listRecords({
      DatasetName: DATASET_NAME,
    })
    .promise()
    .then(response => {
      if (response.data === null) {
        throw new Error('List response data was null');
      }
      const { favorites, playTime } = reduxState;
      const lastSyncedFavorites = getJSONFromLocalStorage(FAVORITES_KEY, []);
      const lastSyncedPlayTime = getJSONFromLocalStorage(PLAY_TIME_KEY, {});
      const addedPlayTime = Reflect.ownKeys(playTime).reduce(
        (addedPlayTimeObj, pieceId) => {
          const current = playTime[pieceId];
          const lastSynced = lastSyncedPlayTime[pieceId] || 0;
          addedPlayTimeObj[pieceId] = current - lastSynced;
          return addedPlayTimeObj;
        },
        {}
      );
      const addedFavorites = favorites.filter(
        pieceId => !lastSyncedFavorites.includes(pieceId)
      );
      const removedFavorites = lastSyncedFavorites.filter(
        pieceId => !favorites.includes(pieceId)
      );
      const [remotePlayTime, playTimeSyncCount] = getJSONFromDataset(
        response.data.Records,
        PLAY_TIME_KEY,
        {}
      );
      const [remoteFavorites, favoritesSyncCount] = getJSONFromDataset(
        response.data.Records,
        FAVORITES_KEY,
        []
      );
      const newPlayTime = Array.from(
        new Set([
          ...Reflect.ownKeys(remoteFavorites),
          ...Reflect.ownKeys(addedPlayTime),
        ])
      ).reduce((newPlayTimeObj, pieceId) => {
        const added = addedPlayTime[pieceId] || 0;
        const remote = remotePlayTime[pieceId] || 0;
        newPlayTime[pieceId] = added + remote;
        return newPlayTimeObj;
      }, {});
      const newFavorites = Array.from([
        new Set([
          ...addedFavorites,
          remoteFavorites.filter(
            pieceId => !removedFavorites.includes(pieceId)
          ),
        ]),
      ]);
      return cognitoSync
        .updateRecords({
          DatasetName: DATASET_NAME,
          RecordPatches: [
            {
              Key: PLAY_TIME_KEY,
              Op: 'replace',
              Value: JSON.stringify(newPlayTime),
              SyncCount: playTimeSyncCount + 1,
            },
            {
              Key: FAVORITES_KEY,
              Op: 'replace',
              Value: JSON.stringify(newFavorites),
              SyncCount: favoritesSyncCount + 1,
            },
          ],
          SyncSessionToken: response.SyncSessionToken,
        })
        .promise()
        .then(updateResponse => {
          if (updateResponse.data === null) {
            throw new Error('Update response data was null');
          }
          const updatedPlayTimeStr = getStringFromDataset(
            updateResponse,
            PLAY_TIME_KEY,
            newPlayTime
          );
          const updatedFavoritesStr = getStringFromDataset(
            updateResponse,
            FAVORITES_KEY,
            newFavorites
          );
          localStorage.set(PLAY_TIME_KEY, updatedPlayTimeStr);
          localStorage.set(FAVORITES_KEY, updatedFavoritesStr);
        })
        .catch(err => {
          //eslint-disable-next-line no-console
          console.error('Failed to sync data:', err);
        });
    })
    .catch(err => {
      //eslint-disable-next-line no-console
      console.error('Failed to sync data:', err);
    });
};

export default sync;
