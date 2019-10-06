import UPDATE_GLOBAL_PLAY_TIME from '../actions/types/update-global-play-time.type';
import objToMap from '@utils/obj-to-map';

const preloadedGlobalPlayTime = {
  'alex-bainter-no-refrain': 1181786232,
  'alex-bainter-animalia-chordata': 1469432711,
  'alex-bainter-agua-ravine': 2206979108,
  'alex-bainter-at-sunrise': 3386907473,
  'alex-bainter-buttafingers': 2370447819,
  'alex-bainter-timbral-oscillations': 580482702,
  'alex-bainter-little-bells': 437367399,
  'alex-bainter-apoapsis': 992777868,
  'alex-bainter-return-to-form': 955156108,
  'alex-bainter-awash': 2358883288,
  'alex-bainter-above-the-rain': 1394066088,
  'alex-bainter-quarter-eyes': 1921340958,
  'alex-bainter-sevenths': 568086137,
  'alex-bainter-last-transit': 1270803586,
  'alex-bainter-didgeridoobeats': 1807364858,
  'alex-bainter-yesterday': 1342299798,
  'alex-bainter-day-dream': 4304798634,
  'alex-bainter-moment': 1007335664,
  'alex-bainter-substrate': 2020747024,
  'alex-bainter-meditation': 993813215,
  'alex-bainter-spring-again': 4619534408,
  'alex-bainter-trees': 4364515768,
  'alex-bainter-observable-streams': 1268935591,
  'alex-bainter-a-viable-system': 861390650,
  'alex-bainter-impact': 758815607,
  'alex-bainter-townsend': 3176188785,
  'alex-bainter-aisatsana': 3161560417,
  'alex-bainter-pulse-code-modulation': 3059602403,
  'alex-bainter-homage': 2078802398,
  'alex-bainter-drones-2': 2356854419,
  'alex-bainter-drones': 5592073416,
  'alex-bainter-peace': 1664087784,
  'alex-bainter-expand-collapse': 833932875,
  'alex-bainter-enough': 2464073796,
  'alex-bainter-western-medicine': 469310117,
  'alex-bainter-eno-machine': 2513258873,
  'alex-bainter-neuroplasticity': 1919431310,
  'alex-bainter-stratospheric': 1325697702,
  'alex-bainter-pinwheels': 511892985,
  'alex-bainter-lemniscate': 1722028142,
  'alex-bainter-otherness': 523425912,
  'alex-bainter-bhairav': 1902285965,
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
