import Tone from 'tone';
import shuffle from 'shuffle-array';
import getPercussionTrigger from '../util/get-percussion-trigger';
import getRandomBetween from '../util/get-random-between';

const BPM = 120;
const EIGHTH_NOTE_INTERVAL = 60 / (2 * BPM);
const QUARTER_NOTE_CHANCE = 0.75;
const EIGHTH_NOTE_CHANCE = 0.5;
const EIGHTH_NOTES_PER_MEASURE = 8; // 4/4 time
const MIN_NUM_MEASURES = 1;
const MAX_NUM_MEASURES = 4;

const instrumentNames = shuffle([
  'sso-bass-drum',
  'sso-cabasa',
  'sso-castanets',
  'sso-conga',
  'sso-finger-cymbal',
  'sso-shaker',
  'sso-sleigh-bells',
  'sso-tambourine',
  'sso-wood-block',
]);

const generateMeasures = (possibleNotes, numMeasures = 1) => {
  const beats = [];
  let quarterNote = false;
  for (let measureIndex = 0; measureIndex < numMeasures; measureIndex += 1) {
    for (let i = 0; i < EIGHTH_NOTES_PER_MEASURE; i += 1) {
      if (
        Math.random() < (quarterNote ? QUARTER_NOTE_CHANCE : EIGHTH_NOTE_CHANCE)
      ) {
        beats.push({
          time:
            i * EIGHTH_NOTE_INTERVAL +
            measureIndex * EIGHTH_NOTE_INTERVAL * EIGHTH_NOTES_PER_MEASURE,
          note:
            possibleNotes[
              Math.floor(getRandomBetween(0, possibleNotes.length))
            ],
        });
        quarterNote = !quarterNote;
      }
    }
  }
  return beats;
};

const scheduleInstrument = (instrument, stackNum) => {
  // const numMeasures = Math.floor(
  //   getRandomBetween(MIN_NUM_MEASURES, MAX_NUM_MEASURES + 1)
  // );
  const numMeasures = 1;
  const measure = generateMeasures(instrument.possibleNotes, numMeasures);
  Tone.Transport.scheduleRepeat(
    () => {
      measure.forEach(({ note, time }) =>
        instrument.triggerAttack(note, `+${time}`)
      );
    },
    EIGHTH_NOTE_INTERVAL * EIGHTH_NOTES_PER_MEASURE * numMeasures,
    Tone.now(),
    `+${(instrumentNames.length - stackNum) *
      EIGHTH_NOTE_INTERVAL *
      EIGHTH_NOTES_PER_MEASURE *
      4 *
      2}`
  );
};

const piece = (master, log) => {
  log('drums test');
  return Promise.all(instrumentNames.map(getPercussionTrigger)).then(
    instruments => {
      instruments.forEach((instrument, i) => {
        instrument.connect(master);
        log('new conga');
        Tone.Transport.scheduleOnce(() => {
          scheduleInstrument(instrument, i);
        }, i * EIGHTH_NOTE_INTERVAL * EIGHTH_NOTES_PER_MEASURE * 4);
      });
    }
  );
};

export default piece;
