import UPDATE_FAVORITE_COUNT from '../actions/types/update-favorite-count.type';
import objToMap from '@utils/obj-to-map';

const preloadedFavoriteCount = {
  'alex-bainter-animalia-chordata': 24,
  'alex-bainter-last-transit': 11,
  'alex-bainter-stratospheric': 17,
  'alex-bainter-substrate': 8,
  'alex-bainter-at-sunrise': 15,
  'alex-bainter-moment': 15,
  'alex-bainter-agua-ravine': 24,
  'alex-bainter-observable-streams': 5,
  'alex-bainter-eno-machine': 8,
  'alex-bainter-buttafingers': 8,
  'alex-bainter-pulse-code-modulation': 15,
  'alex-bainter-enough': 6,
  'alex-bainter-homage': 9,
  'alex-bainter-impact': 4,
  'alex-bainter-yesterday': 21,
  'alex-bainter-awash': 11,
  'alex-bainter-bhairav': 10,
  'alex-bainter-drones-2': 11,
  'alex-bainter-quarter-eyes': 18,
  'alex-bainter-spring-again': 10,
  'alex-bainter-aisatsana': 19,
  'alex-bainter-no-refrain': 23,
  'alex-bainter-above-the-rain': 9,
  'alex-bainter-apoapsis': 7,
  'alex-bainter-day-dream': 10,
  'alex-bainter-drones': 4,
  'alex-bainter-neuroplasticity': 7,
  'alex-bainter-otherness': 3,
  'alex-bainter-pinwheels': 4,
  'alex-bainter-townsend': 6,
  'alex-bainter-lemniscate': 5,
  'alex-bainter-didgeridoobeats': 6,
  'alex-bainter-expand-collapse': 1,
  'alex-bainter-western-medicine': 1,
  'alex-bainter-a-viable-system': 3,
  'alex-bainter-meditation': 6,
  'alex-bainter-sevenths': 1,
  'alex-bainter-peace': 5,
  'alex-bainter-little-bells': 5,
  'alex-bainter-trees': 8,
  'alex-bainter-return-to-form': 3,
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
