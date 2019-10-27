'use strict';

const { DynamoDB } = require('aws-sdk');
const { production } = require('./secrets');
const { dynamoStatsTableName, dynamoStatesTableName } = production;

const dynamodb = new DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-west-2',
});

const scanPromise = ExclusiveStartKey =>
  new Promise((resolve, reject) => {
    dynamodb.scan(
      Object.assign(
        { TableName: dynamoStatesTableName },
        ExclusiveStartKey ? { ExclusiveStartKey } : {}
      ),
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });

const appendItemsAndQueueNext = data => {
  const items = [];
  const { Items, LastEvaluatedKey } = data;
  items.push(...Items);
  if (LastEvaluatedKey) {
    return scanPromise(LastEvaluatedKey)
      .catch(err => console.error(err))
      .then(result => appendItemsAndQueueNext(result))
      .then(nextItems => items.concat(nextItems));
  }
  return Promise.resolve(items);
};

const getTotalPlaytime = items =>
  items.reduce((totalPlayTime, item) => {
    if (item.playTime) {
      Reflect.ownKeys(item.playTime.M)
        .filter(pieceId => pieceId.includes('alex-bainter-'))
        .forEach(pieceId => {
          if (totalPlayTime.has(pieceId)) {
            totalPlayTime.set(
              pieceId,
              totalPlayTime.get(pieceId) +
                Number.parseInt(item.playTime.M[pieceId].N, 10)
            );
          } else {
            totalPlayTime.set(
              pieceId,
              Number.parseInt(item.playTime.M[pieceId].N, 10)
            );
          }
        });
    }
    return totalPlayTime;
  }, new Map());

const getFavorites = items =>
  items.reduce((favoriteCounts, item) => {
    if (item.favorites) {
      item.favorites.SS.forEach(pieceId => {
        if (favoriteCounts.has(pieceId)) {
          favoriteCounts.set(pieceId, favoriteCounts.get(pieceId) + 1);
        } else {
          favoriteCounts.set(pieceId, 1);
        }
      });
    }
    return favoriteCounts;
  }, new Map());

const mapToObj = map =>
  Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

const putAs = name => obj =>
  new Promise((resolve, reject) => {
    const params = {
      Item: {
        name: {
          S: name,
        },
        json: {
          S: JSON.stringify(obj),
        },
      },
      TableName: dynamoStatsTableName,
    };
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const pipe = (...fns) => x => fns.reduce((lastVal, fn) => fn(lastVal), x);

const playTime = pipe(
  getTotalPlaytime,
  mapToObj,
  putAs('playTime')
);
const favoriteCounts = pipe(
  getFavorites,
  mapToObj,
  putAs('favorites')
);

scanPromise()
  .catch(err => console.error(err))
  .then(data => appendItemsAndQueueNext(data))
  .then(items => Promise.all([playTime(items), favoriteCounts(items)]))
  .then(results => results.forEach(result => console.log(result)))
  .catch(err => console.error(err));
