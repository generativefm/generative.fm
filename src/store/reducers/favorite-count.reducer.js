import UPDATE_FAVORITE_COUNT from '../actions/types/update-favorite-count.type';
import objToMap from '@utils/obj-to-map';

const preloadedFavoriteCount = {
  'alex-bainter-animalia-chordata': 25,
  'alex-bainter-last-transit': 11,
  'alex-bainter-stratospheric': 19,
  'alex-bainter-substrate': 9,
  'alex-bainter-at-sunrise': 16,
  'alex-bainter-moment': 16,
  'alex-bainter-agua-ravine': 25,
  'alex-bainter-drones': 6,
  'alex-bainter-drones-2': 13,
  'alex-bainter-observable-streams': 7,
  'alex-bainter-eno-machine': 9,
  'alex-bainter-buttafingers': 8,
  'alex-bainter-pulse-code-modulation': 17,
  'alex-bainter-enough': 7,
  'alex-bainter-homage': 10,
  'alex-bainter-impact': 4,
  'alex-bainter-yesterday': 23,
  'alex-bainter-awash': 13,
  'alex-bainter-bhairav': 12,
  'alex-bainter-quarter-eyes': 21,
  'alex-bainter-spring-again': 10,
  'alex-bainter-aisatsana': 22,
  'alex-bainter-no-refrain': 22,
  'alex-bainter-above-the-rain': 13,
  'alex-bainter-apoapsis': 7,
  'alex-bainter-day-dream': 12,
  'alex-bainter-neuroplasticity': 9,
  'alex-bainter-soundtrack': 4,
  'alex-bainter-otherness': 3,
  'alex-bainter-pinwheels': 4,
  'alex-bainter-townsend': 7,
  'alex-bainter-lemniscate': 5,
  'alex-bainter-didgeridoobeats': 8,
  'alex-bainter-expand-collapse': 1,
  'alex-bainter-western-medicine': 2,
  'alex-bainter-a-viable-system': 3,
  'alex-bainter-meditation': 6,
  'alex-bainter-sevenths': 1,
  'alex-bainter-peace': 5,
  'alex-bainter-little-bells': 6,
  'alex-bainter-trees': 8,
  'alex-bainter-return-to-form': 5,
};

const favoriteCountReducer = (
  state = objToMap(preloadedFavoriteCount),
  action
) => {
  if (action.type === UPDATE_FAVORITE_COUNT) {
    return action.payload;
  }
  return state;
};

export default favoriteCountReducer;
