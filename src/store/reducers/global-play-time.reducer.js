import UPDATE_GLOBAL_PLAY_TIME from '../actions/types/update-global-play-time.type';
import objToMap from '@utils/obj-to-map';

const preloadedGlobalPlayTime = {
  'alex-bainter-no-refrain': 1146648195,
  'alex-bainter-animalia-chordata': 1455609877,
  'alex-bainter-agua-ravine': 1967200560,
  'alex-bainter-at-sunrise': 3120825785,
  'alex-bainter-buttafingers': 2245739066,
  'alex-bainter-timbral-oscillations': 542102171,
  'alex-bainter-little-bells': 340030919,
  'alex-bainter-apoapsis': 891023044,
  'alex-bainter-return-to-form': 919164487,
  'alex-bainter-awash': 2207033968,
  'alex-bainter-above-the-rain': 1206056795,
  'alex-bainter-quarter-eyes': 1868204683,
  'alex-bainter-sevenths': 544867481,
  'alex-bainter-last-transit': 1233235694,
  'alex-bainter-didgeridoobeats': 1783099466,
  'alex-bainter-yesterday': 1270316360,
  'alex-bainter-day-dream': 4258837333,
  'alex-bainter-moment': 979413478,
  'alex-bainter-substrate': 2001903644,
  'alex-bainter-meditation': 943453103,
  'alex-bainter-spring-again': 4542327161,
  'alex-bainter-trees': 4118766645,
  'alex-bainter-observable-streams': 948553291,
  'alex-bainter-a-viable-system': 757954164,
  'alex-bainter-impact': 577661728,
  'alex-bainter-townsend': 3148633233,
  'alex-bainter-aisatsana': 3022205709,
  'alex-bainter-pulse-code-modulation': 3011001888,
  'alex-bainter-homage': 1995091663,
  'alex-bainter-drones-2': 2259744093,
  'alex-bainter-drones': 5345933011,
  'alex-bainter-peace': 1459699890,
  'alex-bainter-expand-collapse': 617959558,
  'alex-bainter-enough': 2361522546,
  'alex-bainter-eno-machine': 2096458552,
  'alex-bainter-neuroplasticity': 1800339768,
  'alex-bainter-stratospheric': 1280065346,
  'alex-bainter-western-medicine': 133977208,
  'alex-bainter-pinwheels': 469469654,
  'alex-bainter-lemniscate': 1485498526,
  'alex-bainter-otherness': 497040189,
  'alex-bainter-bhairav': 1870837170,
};

const globalPlayTimeReducer = (
  state = objToMap(preloadedGlobalPlayTime),
  action
) => {
  if (action.type === UPDATE_GLOBAL_PLAY_TIME) {
    return action.payload;
  }
  return state;
};

export default globalPlayTimeReducer;
