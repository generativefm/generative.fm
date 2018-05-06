import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';
import log from '../util/log';
import notes from '../note-sets/music-for-airportsish';
import roundToTwo from '../util/round-to-two';

const TICK_INTERVAL_SECONDS = 1;
const OSCILLATION_SECONDS = 240;
const MIN_REPEAT_S = 30;
const MAX_REPEAT_S = 80;

log('lemniscate');

const timing = new Tone.CtrlRandom(MIN_REPEAT_S, MAX_REPEAT_S);

function* oscillate(min, max, start, divisor, additionFirst = true) {
  const difference = Math.abs(max) + Math.abs(min);
  let addition = additionFirst;
  const delta = difference / divisor;
  let value = start;
  while (true) {
    value = value += addition ? delta : -delta;
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

const makeTick = pans => () => {
  centerProbability = probabilityGenerator.next().value;
  const outsideProbability = 1 - centerProbability;
  const pan1 = outsideProbability;
  const pan2 = -outsideProbability;
  pans[0].set({ pan: pan1 });
  pans[1].set({ pan: pan2 });
};

const formatPct = num => `${roundToTwo(num * 100)}%`;

const generateTiming = (instruments, getPlayProbability, id) => {
  notes.forEach(note => {
    const interval = timing.value;
    const delay = timing.value - MIN_REPEAT_S;
    log(
      `${id}: scheduling ${note.toLowerCase()} every ${roundToTwo(
        interval
      )} seconds starting in ${roundToTwo(delay)} seconds`
    );
    Tone.Transport.scheduleRepeat(
      () => {
        const random = Math.random();
        const probability = getPlayProbability();
        if (random <= probability) {
          instruments.forEach(instrument =>
            instrument.triggerAttackRelease(note, '+1')
          );
          Tone.Draw.schedule(() => {
            const probabilityPct = formatPct(probability);
            log(
              `${id} ${
                instruments.length === 1 ? `(panned ${probabilityPct}) ` : ' '
              }playing ${note.toLowerCase()} (${probabilityPct} chance to play)`
            );
          }, '+1');
        }
      },
      interval,
      delay
    );
  });
};

const lemniscate = Promise.all([
  getSampledInstrument('sso-piano'),
  getSampledInstrument('sso-piano'),
]).then(instruments => {
  const [firstInstrument, secondInstrument] = instruments;
  const firstPan = new Tone.Panner(-1);
  const secondPan = new Tone.Panner(1);
  firstInstrument.chain(firstPan, Tone.Master);
  secondInstrument.chain(secondPan, Tone.Master);
  const tick = makeTick([firstPan, secondPan]);
  generateTiming(
    [firstInstrument, secondInstrument],
    () => centerProbability,
    'both'
  );
  generateTiming([firstInstrument], () => 1 - centerProbability, 'left');
  generateTiming([secondInstrument], () => 1 - centerProbability, 'right');
  Tone.Transport.scheduleRepeat(tick, TICK_INTERVAL_SECONDS);
});

export default lemniscate;
