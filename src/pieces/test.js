import noteTester from '../patterns/note-tester';
import notes from '../note-sets/piano-keys';

const INSTRUMENT = 'vco2-piano-mf';

const piece = (master, log) => {
  log(`testing ${INSTRUMENT}`);
  return noteTester(notes, INSTRUMENT, log).then(instrument =>
    instrument.connect(master)
  );
};

export default piece;
