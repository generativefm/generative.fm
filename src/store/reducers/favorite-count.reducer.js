import UPDATE_FAVORITE_COUNT from '../actions/types/update-favorite-count.type';
import objToMap from '@utils/obj-to-map';

const preloadedFavoriteCount = {
  'alex-bainter-animalia-chordata': 24,
  'alex-bainter-last-transit': 11,
  'alex-bainter-stratospheric': 17,
  'alex-bainter-substrate': 8,
  'alex-bainter-at-sunrise': 15,
  'alex-bainter-moment': 15,
  'alex-bainter-agua-ravine': 23,
  'alex-bainter-observable-streams': 5,
  'alex-bainter-eno-machine': 8,
  'alex-bainter-buttafingers': 8,
  'alex-bainter-pulse-code-modulation': 15,
  'alex-bainter-enough': 4,
  'alex-bainter-homage': 7,
  'alex-bainter-impact': 4,
  'alex-bainter-yesterday': 20,
  'alex-bainter-awash': 9,
  'alex-bainter-bhairav': 10,
  'alex-bainter-drones-2': 10,
  'alex-bainter-quarter-eyes': 17,
  'alex-bainter-spring-again': 10,
  'alex-bainter-aisatsana': 17,
  'alex-bainter-no-refrain': 22,
  'alex-bainter-above-the-rain': 8,
  'alex-bainter-otherness': 3,
  'alex-bainter-pinwheels': 4,
  'alex-bainter-townsend': 6,
  'alex-bainter-day-dream': 9,
  'alex-bainter-lemniscate': 5,
  'alex-bainter-didgeridoobeats': 6,
  'alex-bainter-expand-collapse': 1,
  'alex-bainter-apoapsis': 6,
  'alex-bainter-a-viable-system': 3,
  'alex-bainter-meditation': 5,
  'alex-bainter-sevenths': 1,
  'alex-bainter-neuroplasticity': 6,
  'alex-bainter-peace': 5,
  'alex-bainter-little-bells': 4,
  'alex-bainter-trees': 6,
  'alex-bainter-return-to-form': 3,
  'alex-bainter-drones': 3,
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
