import randomizedArpeggiator from '../patterns/randomized-arpeggiator';
import notes from '../note-sets/music-for-airportsish';

const INSTRUMENT = 'sso-piano';
const MIN_REPEAT_S = 20;
const MAX_REPEAT_S = 60;

export default (master, log) => {
  log('eno machine');
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
