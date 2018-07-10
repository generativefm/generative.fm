import randomizedArpeggiator from '../patterns/randomized-arpeggiator';
import notes from '../note-sets/music-for-airportsish';

const INSTRUMENT = 'vco2-harp';
const MIN_REPEAT_S = 10;
const MAX_REPEAT_S = 30;

export default (master, log) => {
  log('harp');
  return randomizedArpeggiator(
    notes,
    INSTRUMENT,
    MIN_REPEAT_S,
    MAX_REPEAT_S,
    log
  )
    .then(instrument => instrument.connect(master))
    .then(() => log('ready'));
};
