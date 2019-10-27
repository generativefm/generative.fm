import UPDATE_GLOBAL_PLAY_TIME from '../actions/types/update-global-play-time.type';
import objToMap from '@utils/obj-to-map';

const preloadedGlobalPlayTime = {
  'alex-bainter-no-refrain': 2666758309,
  'alex-bainter-animalia-chordata': 2186370682,
  'alex-bainter-agua-ravine': 3589023623,
  'alex-bainter-at-sunrise': 4573666890,
  'alex-bainter-western-medicine': 1133512485,
  'alex-bainter-moment': 1592925435,
  'alex-bainter-soundtrack': 1003783165,
  'alex-bainter-stratospheric': 1685948960,
  'alex-bainter-buttafingers': 3371052773,
  'alex-bainter-timbral-oscillations': 905872821,
  'alex-bainter-little-bells': 784822721,
  'alex-bainter-apoapsis': 1519413979,
  'alex-bainter-return-to-form': 1847125876,
  'alex-bainter-awash': 3264437592,
  'alex-bainter-above-the-rain': 2724120255,
  'alex-bainter-spring-again': 7502390276,
  'alex-bainter-day-dream': 4691719164,
  'alex-bainter-quarter-eyes': 2337464599,
  'alex-bainter-sevenths': 930347861,
  'alex-bainter-last-transit': 1517475293,
  'alex-bainter-didgeridoobeats': 2513205410,
  'alex-bainter-yesterday': 2205843190,
  'alex-bainter-substrate': 2247275015,
  'alex-bainter-meditation': 3133025291,
  'alex-bainter-trees': 4935145374,
  'alex-bainter-observable-streams': 2754434399,
  'alex-bainter-a-viable-system': 1267072324,
  'alex-bainter-impact': 892509884,
  'alex-bainter-townsend': 3922943700,
  'alex-bainter-aisatsana': 5140703391,
  'alex-bainter-pulse-code-modulation': 4496242372,
  'alex-bainter-homage': 2965324599,
  'alex-bainter-drones-2': 4211317314,
  'alex-bainter-drones': 11158379948,
  'alex-bainter-peace': 1959520416,
  'alex-bainter-nakaii': 1321362857,
  'alex-bainter-expand-collapse': 1386018667,
  'alex-bainter-enough': 3708609093,
  'alex-bainter-eno-machine': 3531026106,
  'alex-bainter-neuroplasticity': 2378914969,
  'alex-bainter-remembering': 328124352,
  'alex-bainter-pinwheels': 763282058,
  'alex-bainter-lemniscate': 2921137907,
  'alex-bainter-otherness': 794263248,
  'alex-bainter-bhairav': 2734203550,
  'alex-bainter-eyes-closed': 5000,
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
