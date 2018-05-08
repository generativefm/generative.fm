import randomizedArpeggiator from '../patterns/randomized-arpeggiator';
import notes from '../note-sets/music-for-airportsish';
import log from '../util/log';

const INSTRUMENT = 'sso-piano';
const MIN_REPEAT_S = 20;
const MAX_REPEAT_S = 60;

log('eno machine');

export default master =>
  randomizedArpeggiator(notes, INSTRUMENT, MIN_REPEAT_S, MAX_REPEAT_S).then(
    instrument => instrument.connect(master)
  );
