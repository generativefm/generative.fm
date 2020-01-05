import { CognitoSync, CognitoIdentityCredentials } from 'aws-sdk';
import userPoolId from '@config/cognito-user-pool-id';
import identityPoolId from '@config/cognito-identity-pool-id';
import fetch from './fetch';
import playTimeKey from './play-time-key';
import favoritesKey from './favorites-key';
import getCognitoSync from './get-cognito-sync';
import datasetName from './dataset-name';

// const credentialsCache = new Map();

// const getCognitoCredentials = (identityId, idJwtToken) => {
//   const cacheKey = `${identityId}|${idJwtToken}`;
//   if (credentialsCache.has(cacheKey)) {
//     return credentialsCache.get(cacheKey);
//   }
//   credentialsCache.clear();
//   const credentials = new CognitoIdentityCredentials(
//     {
//       IdentityId: identityId,
//       Logins: {
//         [`cognito-idp.us-west-2.amazonaws.com/${userPoolId}`]: idJwtToken,
//       },
//     },
//     { region: 'us-west-2' }
//   );
//   credentialsCache.set(cacheKey, credentials);
//   return credentials;
// };
const getJSONFromLocalStorage = (key, defaultValue) => {
  const jsonStr = window.localStorage.getItem(key);
  if (jsonStr === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    return defaultValue;
  }
};

const sync = (currentCredentials, store) =>
  fetch(currentCredentials, store.dispatch)
    .then(remoteData => {
      const { favorites, playTime } = store.getState();
      const lastSyncedFavorites = getJSONFromLocalStorage(favoritesKey, []);
      const lastSyncedPlayTime = getJSONFromLocalStorage(playTimeKey, {});
      const addedPlayTime = Reflect.ownKeys(playTime).reduce(
        (addedPlayTimeObj, pieceId) => {
          const current = playTime[pieceId];
          const lastSynced = lastSyncedPlayTime[pieceId] || 0;
          addedPlayTimeObj[pieceId] = current - lastSynced;
          return addedPlayTimeObj;
        },
        {}
      );
      const addedFavorites = Array.from(favorites).filter(
        pieceId => !lastSyncedFavorites.includes(pieceId)
      );
      const removedFavorites = lastSyncedFavorites.filter(
        pieceId => !favorites.has(pieceId)
      );
      if (
        Object.values(addedPlayTime).every(time => time <= 0) &&
        addedFavorites.length === 0 &&
        removedFavorites.length === 0
      ) {
        return Promise.resolve();
      }
      const newPlayTime = Array.from(
        new Set([
          ...Reflect.ownKeys(remoteData.playTime),
          ...Reflect.ownKeys(addedPlayTime),
        ])
      ).reduce((newPlayTimeObj, pieceId) => {
        const added = addedPlayTime[pieceId] || 0;
        const remote = remoteData.playTime[pieceId] || 0;
        newPlayTimeObj[pieceId] = added + remote;
        return newPlayTimeObj;
      }, {});
      const newFavorites = Array.from(
        new Set([
          ...addedFavorites,
          ...remoteData.favorites.filter(
            pieceId => !removedFavorites.includes(pieceId)
          ),
        ])
      );
      return getCognitoSync(currentCredentials)
        .updateRecords({
          DatasetName: datasetName,
          RecordPatches: [
            {
              Key: playTimeKey,
              Op: 'replace',
              Value: JSON.stringify(newPlayTime),
              SyncCount: remoteData.playTimeSyncCount + 1,
            },
            {
              Key: favoritesKey,
              Op: 'replace',
              Value: JSON.stringify(newFavorites),
              SyncCount: remoteData.favoritesSyncCount + 1,
            },
          ],
          SyncSessionToken: remoteData.syncSessionToken,
        })
        .promise()
        .then(response => {
          if (response === null) {
            throw new Error('Update response data was null');
          }
          window.localStorage.setItem(playTimeKey, JSON.stringify(playTime));
          window.localStorage.setItem(
            favoritesKey,
            JSON.stringify(Array.from(favorites))
          );
        })
        .catch(err => {
          //eslint-disable-next-line no-console
          console.error('Failed to update data:', err);
        });
    })
    .catch(err => {
      //eslint-disable-next-line no-console
      console.error('Failed to fetch data:', err);
    });

export default sync;
