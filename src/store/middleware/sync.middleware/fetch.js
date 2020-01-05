import updateUserData from '../../actions/creators/update-user-data.creator';
import getCognitoSync from './get-cognito-sync';
import datasetName from './dataset-name';
import playTimeKey from './play-time-key';
import favoritesKey from './favorites-key';

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

const fetch = (currentCredentials, dispatch) =>
  getCognitoSync(currentCredentials)
    .listRecords({ DatasetName: datasetName })
    .promise()
    .then(response => {
      if (response === null) {
        throw new Error('Response data was null');
      }
      const [playTime, playTimeSyncCount] = getJSONFromDataset(
        response.Records,
        playTimeKey,
        {}
      );
      const [favorites, favoritesSyncCount] = getJSONFromDataset(
        response.Records,
        favoritesKey,
        []
      );
      dispatch(updateUserData({ favorites, playTime }));
      return {
        playTime,
        playTimeSyncCount,
        favorites,
        favoritesSyncCount,
        syncSessionToken: response.SyncSessionToken,
      };
    });

export default fetch;
