import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';

const noteTester = (notes, instrumentName, log) =>
  getSampledInstrument(instrumentName).then(instrument => {
    Tone.Transport.scheduleRepeat(
      () => {
        notes.forEach((note, i) => {
          const time = `+${i + 1}`;
          Tone.Draw.schedule(() => {
            log(`playing ${note.toLowerCase()}`);
          }, time);
          instrument.triggerAttack(note, time);
        });
      },
      notes.length + 5,
      '+1'
    );
    return instrument;
  });

export default noteTester;
