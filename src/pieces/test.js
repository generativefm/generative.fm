import randomizedArpeggiator from '../patterns/randomized-arpeggiator';
import combineNotesWithOctaves from '../util/combine-notes-with-octaves';

const notes = ['C', 'C#', 'D#', 'F', 'G#', 'A'];
const octaves = [2, 3];

const allNotes = combineNotesWithOctaves(notes, octaves);

const INSTRUMENT = 'alone-guitar';

const piece = (master, log) => {
  log(`testing ${INSTRUMENT}`);
  return randomizedArpeggiator(allNotes, INSTRUMENT, 10, 30, log).then(
    instrument => instrument.connect(master)
  );
};

export default piece;
