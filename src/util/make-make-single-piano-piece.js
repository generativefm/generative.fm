import time from '@generative-music/time-tonejs';
import makeInstrument from '@generative-music/instrument-tonejs';
import getSampledInstrument from '../util/get-sampled-instrument';
import pianoSamplesName from '../config/piano-samples-name';

const makeMakeSinglePianoPiece = piece => master =>
  getSampledInstrument(pianoSamplesName).then(toneInstrument => {
    toneInstrument.connect(master);
    const instruments = [makeInstrument({ toneInstrument })];
    piece({ instruments, time });
  });

export default makeMakeSinglePianoPiece;
