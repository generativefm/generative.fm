import getSampledInstrument from '../util/get-sampled-instrument';
import { Transport } from 'tone';
import { minor7th } from '../theory/chords';
import shuffle from 'shuffle-array';
import getRandomBetween from '../util/get-random-between';
import combineNotesWithOctaves from '../util/combine-notes-with-octaves';
import allLetters from '../note-sets/all-letters';
import getRandomElement from '../util/get-random-element';
import pipe from '../util/pipe';
import getRandomIntBetween from '../util/get-random-int-between';
import pianoSamplesName from '../config/piano-samples-name';

const SPAWN_TWO_P = 0.33;
const OCTAVES = [3, 4, 5];

const tonics = combineNotesWithOctaves(allLetters, OCTAVES);

function* makeArrayLooper(arr) {
  for (let i = 0; i < arr.length; i === arr.length - 1 ? (i = 0) : (i += 1)) {
    yield arr[i];
  }
}

const startPinwheelChain = (instrument, log) => {
  const generatePinwheel = (
    spawnNext = true,
    tonic = getRandomElement(tonics),
    maxDelay = getRandomBetween(2, 5)
  ) => {
    const inversion = getRandomIntBetween(0, 4);
    const noteGenerator = pipe(
      note => minor7th(note, inversion),
      shuffle,
      makeArrayLooper
    )(tonic);
    log(`generated pinwheel for ${tonic} minor 7th inversion ${inversion}`);
    const minDelay = getRandomBetween(0.05, 0.1);
    const playNextNote = (delay, multiplier = getRandomBetween(0.85, 0.95)) => {
      Transport.scheduleOnce(() => {
        instrument.triggerAttack(noteGenerator.next().value, '+1');
        const nextDelay = delay * multiplier;
        if (nextDelay < minDelay) {
          playNextNote(nextDelay, getRandomBetween(1.05, 1.15));
        } else if (nextDelay > maxDelay) {
          if (spawnNext) {
            Transport.scheduleOnce(() => {
              if (Math.random() < SPAWN_TWO_P) {
                const nextLetter = getRandomElement(allLetters);
                const octaves = shuffle(OCTAVES.slice(0));
                const delay1 = getRandomBetween(2, 5);
                const delay2 = getRandomBetween(2, 5);
                generatePinwheel(
                  delay1 >= delay2,
                  `${nextLetter}${octaves.pop()}`,
                  delay1
                );
                generatePinwheel(
                  delay1 < delay2,
                  `${nextLetter}${octaves.pop()}`,
                  delay2
                );
              } else {
                generatePinwheel();
              }
            }, `+${getRandomBetween(2, 5)}`);
          }
        } else {
          playNextNote(nextDelay, multiplier);
        }
      }, `+${delay}`);
    };
    playNextNote(maxDelay);
  };
  generatePinwheel();
};

export default (master, log) => {
  log('pinwheels');
  return getSampledInstrument(pianoSamplesName).then(instrument => {
    log('ready');
    instrument.connect(master);
    startPinwheelChain(instrument, log);
  });
};
