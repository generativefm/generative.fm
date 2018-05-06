import interval from './interval';
import invert from './invert';

const chord = (tonic, intervals, inversion = 0) =>
  invert([tonic].concat(intervals.map(interval(tonic))), inversion);

export default chord;
