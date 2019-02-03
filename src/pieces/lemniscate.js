import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';
import { minor7th } from '../theory/chords';
import combineNotesWithOctaves from '../util/combine-notes-with-octaves';

const TONIC = 'A#';
const OCTAVES = [2, 3, 4, 5, 6];

const notes = combineNotesWithOctaves([TONIC], OCTAVES).reduce(
  (allNotes, note) => allNotes.concat(minor7th(note)),
  []
);

const INSTRUMENT_NAME = 'vsco2-piano-mf';
const TICK_INTERVAL_SECONDS = 1;
const OSCILLATION_SECONDS = 240;
const MIN_REPEAT_S = 30;
const MAX_REPEAT_S = 80;

const timing = new Tone.CtrlRandom(MIN_REPEAT_S, MAX_REPEAT_S);

function* oscillate(min, max, start, divisor, additionFirst = true) {
  const difference = max - min;
  let addition = additionFirst;
  const delta = difference / divisor;
  let value = start;
  while (true) {
    value = addition
      ? Math.min(value + delta, max)
      : Math.max(value - delta, min);
    addition = value >= max || value <= min ? !addition : addition;
    yield value;
  }
}

let centerProbability = 1;
const probabilityGenerator = oscillate(
  0,
  1,
  centerProbability,
  OSCILLATION_SECONDS,
  false
);

const makeTick = pans => {
  const tick = () => {
    centerProbability = probabilityGenerator.next().value;
    const outsideProbability = 1 - centerProbability;
    const pan1 = outsideProbability;
    const pan2 = -outsideProbability;
    pans[0].set({ pan: pan1 });
    pans[1].set({ pan: pan2 });
    Tone.Transport.scheduleOnce(tick, `+${TICK_INTERVAL_SECONDS}`);
  };
  return tick;
};

const generateTiming = (instruments, getPlayProbability) => {
  notes.forEach(note => {
    const interval = timing.value;
    const delay = timing.value - MIN_REPEAT_S;
    Tone.Transport.scheduleRepeat(
      () => {
        const random = Math.random();
        const probability = getPlayProbability();
        if (random <= probability) {
          instruments.forEach(instrument =>
            instrument.triggerAttackRelease(note, '+1')
          );
        }
      },
      interval,
      delay
    );
  });
};

const lemniscate = master => {
  const firstPan = new Tone.Panner(-1).connect(master);
  const secondPan = new Tone.Panner(1).connect(master);
  return Promise.all([
    getSampledInstrument(INSTRUMENT_NAME),
    getSampledInstrument(INSTRUMENT_NAME),
  ]).then(instruments => {
    const [firstInstrument, secondInstrument] = instruments;
    firstInstrument.chain(firstPan);
    secondInstrument.chain(secondPan);
    const tick = makeTick([firstPan, secondPan]);
    generateTiming(
      [firstInstrument, secondInstrument],
      () => centerProbability,
      'both'
    );
    generateTiming([firstInstrument], () => 1 - centerProbability);
    generateTiming([secondInstrument], () => 1 - centerProbability);
    Tone.Transport.scheduleOnce(tick, TICK_INTERVAL_SECONDS);
    return () => {
      instruments.concat([firstPan, secondPan]).forEach(node => node.dispose());
    };
  });
};

export default lemniscate;
