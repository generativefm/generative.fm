import { Transport } from 'tone';
import arpeggiateOnce from '../patterns/arpeggiate-once';
import getSampledInstrument from '../util/get-sampled-instrument';
import { minor7th } from '../theory/chords';
import { P5 } from '../theory/intervals';
import interval from '../theory/interval';

const INSTRUMENT = 'vco2-piano-mf';

const piece = (master, log) => {
  log(`testing ${INSTRUMENT}`);
  return getSampledInstrument(INSTRUMENT).then(instrument => {
    instrument.connect(master);
    log('instrument loaded');
    Transport.scheduleRepeat(() => {
      log('A#');
      arpeggiateOnce(instrument, minor7th('A#4'), 0.75);
    }, 5);
    const fifth = interval('A#4', P5);
    Transport.scheduleRepeat(() => {
      log(fifth);
      arpeggiateOnce(instrument, minor7th(fifth), 1);
    }, 11);
  });
};

export default piece;
