import UPDATE_FAVORITE_COUNT from '../actions/types/update-favorite-count.type';
import objToMap from '@utils/obj-to-map';

const preloadedFavoriteCount = {
  'alex-bainter-animalia-chordata': 28,
  'alex-bainter-aisatsana': 30,
  'alex-bainter-eno-machine': 13,
  'alex-bainter-meditation': 9,
  'alex-bainter-last-transit': 15,
  'alex-bainter-stratospheric': 22,
  'alex-bainter-substrate': 10,
  'alex-bainter-at-sunrise': 23,
  'alex-bainter-moment': 20,
  'alex-bainter-agua-ravine': 27,
  'alex-bainter-drones': 12,
  'alex-bainter-drones-2': 20,
  'alex-bainter-pulse-code-modulation': 26,
  'alex-bainter-observable-streams': 12,
  'alex-bainter-homage': 14,
  'alex-bainter-remembering': 3,
  'alex-bainter-buttafingers': 9,
  'alex-bainter-apoapsis': 14,
  'alex-bainter-spring-again': 15,
  'alex-bainter-above-the-rain': 23,
  'alex-bainter-enough': 11,
  'alex-bainter-impact': 4,
  'alex-bainter-yesterday': 27,
  'alex-bainter-awash': 16,
  'alex-bainter-bhairav': 13,
  'alex-bainter-quarter-eyes': 23,
  'alex-bainter-no-refrain': 22,
  'alex-bainter-day-dream': 16,
  'alex-bainter-neuroplasticity': 14,
  'alex-bainter-soundtrack': 10,
  'alex-bainter-otherness': 5,
  'alex-bainter-pinwheels': 5,
  'alex-bainter-expand-collapse': 5,
  'alex-bainter-little-bells': 7,
  'alex-bainter-townsend': 12,
  'alex-bainter-trees': 10,
  'alex-bainter-lemniscate': 6,
  'alex-bainter-didgeridoobeats': 8,
  'alex-bainter-western-medicine': 3,
  'alex-bainter-a-viable-system': 5,
  'alex-bainter-sevenths': 3,
  'alex-bainter-nakaii': 15,
  'alex-bainter-peace': 5,
  'alex-bainter-return-to-form': 8,
  'alex-bainter-timbral-oscillations': 1,
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
