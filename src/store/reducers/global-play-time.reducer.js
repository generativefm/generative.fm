import UPDATE_GLOBAL_PLAY_TIME from '../actions/types/update-global-play-time.type';
import objToMap from '@utils/obj-to-map';

const preloadedGlobalPlayTime = {
  'alex-bainter-no-refrain': 1394089106,
  'alex-bainter-animalia-chordata': 1824805461,
  'alex-bainter-agua-ravine': 3124168078,
  'alex-bainter-at-sunrise': 4148547318,
  'alex-bainter-western-medicine': 802521849,
  'alex-bainter-moment': 1079991298,
  'alex-bainter-soundtrack': 205686594,
  'alex-bainter-stratospheric': 1418812179,
  'alex-bainter-buttafingers': 2399977046,
  'alex-bainter-timbral-oscillations': 599295472,
  'alex-bainter-little-bells': 661862268,
  'alex-bainter-apoapsis': 1210636442,
  'alex-bainter-return-to-form': 1321343994,
  'alex-bainter-awash': 2479716370,
  'alex-bainter-above-the-rain': 1817592954,
  'alex-bainter-quarter-eyes': 2012616454,
  'alex-bainter-sevenths': 635559926,
  'alex-bainter-last-transit': 1341215885,
  'alex-bainter-didgeridoobeats': 1854680942,
  'alex-bainter-yesterday': 2091878856,
  'alex-bainter-day-dream': 4466193647,
  'alex-bainter-substrate': 2126578731,
  'alex-bainter-meditation': 1215287772,
  'alex-bainter-spring-again': 4967194061,
  'alex-bainter-trees': 4537535464,
  'alex-bainter-observable-streams': 2323427895,
  'alex-bainter-a-viable-system': 904735979,
  'alex-bainter-impact': 787296615,
  'alex-bainter-townsend': 3504476678,
  'alex-bainter-aisatsana': 3641643277,
  'alex-bainter-pulse-code-modulation': 3406405138,
  'alex-bainter-homage': 2308212700,
  'alex-bainter-drones-2': 2805471755,
  'alex-bainter-drones': 8500370971,
  'alex-bainter-peace': 1805784155,
  'alex-bainter-expand-collapse': 902460711,
  'alex-bainter-enough': 2683605316,
  'alex-bainter-eno-machine': 2675637042,
  'alex-bainter-neuroplasticity': 2075464488,
  'alex-bainter-pinwheels': 526242115,
  'alex-bainter-lemniscate': 2433479400,
  'alex-bainter-otherness': 622830172,
  'alex-bainter-bhairav': 2037995460,
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
