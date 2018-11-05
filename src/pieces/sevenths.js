import { Transport, Draw } from 'tone';
import arpeggiateOnce from '../patterns/arpeggiate-once';
import getSampledInstrument from '../util/get-sampled-instrument';
import { minor7th, major7th, dominant7th } from '../theory/chords';
import interval from '../theory/interval';
import getRandomElement from '../util/get-random-element';
import getRandomIntBetween from '../util/get-random-int-between';
import getRandomBetween from '../util/get-random-between';
import pianoSamplesName from '../config/piano-samples-name';

const INSTRUMENT = pianoSamplesName;
const STARTING_NOTE = 'C';
const CHORDS = [
  { name: 'minor 7th', fn: minor7th },
  { name: 'major 7th', fn: major7th },
  { name: 'dominant 7th', fn: dominant7th },
];

const OCTAVES = [2, 3, 4, 5];
const MIN_NEXT_CHORD_TIME = 3;
const MAX_NEXT_CHORD_TIME = 15;
const MIN_ARRPEGGIATE_TIME = 0.25;
const MAX_ARRPEGGIATE_TIME = 5;

const makeScheduleChord = (instrument, log) => (tonic, next) => {
  const chord = getRandomElement(CHORDS);
  const octave = getRandomElement(OCTAVES);
  const inversion = getRandomIntBetween(0, 4);
  const note = `${tonic}${octave}`;
  const notes = chord.fn(note, inversion);
  const time = `+${getRandomBetween(MIN_NEXT_CHORD_TIME, MAX_NEXT_CHORD_TIME)}`;
  Transport.scheduleOnce(() => {
    arpeggiateOnce({
      instrument,
      notes,
      withinTime: getRandomBetween(MIN_ARRPEGGIATE_TIME, MAX_ARRPEGGIATE_TIME),
    });
    const nextTonic = interval(tonic, getRandomIntBetween(0, 13));
    next(nextTonic, next);
  }, time);
  Draw.schedule(() => {
    log(`playing ${note} ${chord.name} inversion ${inversion}`);
  }, time);
};

const piece = (master, log) => {
  log(`sevenths`);
  return getSampledInstrument(INSTRUMENT).then(instrument => {
    instrument.connect(master);
    log('ready');
    const scheduleChord = makeScheduleChord(instrument, log);
    const tonic = STARTING_NOTE;
    scheduleChord(tonic, scheduleChord);
  });
};

export default piece;
