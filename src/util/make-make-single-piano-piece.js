import time from '@generative-music/time-tonejs';
import makeInstrument from '@generative-music/instrument-tonejs';
import getSampledInstrument from '../util/get-sampled-instrument';

const makeMakeSinglePianoPiece = piece => master =>
  getSampledInstrument('vsco2-piano-mf').then(toneInstrument => {
    toneInstrument.connect(master);
    const instruments = [makeInstrument({ toneInstrument })];
    piece({ instruments, time });
  });

export default makeMakeSinglePianoPiece;
