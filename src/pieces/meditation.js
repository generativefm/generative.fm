import piece from '@generative-music/piece-meditation';
import delayTimeInSeconds from '@generative-music/piece-meditation/config/delay-time-in-seconds';
import delayFeedback from '@generative-music/piece-meditation/config/delay-feedback';
import volume from '@generative-music/piece-meditation/config/tone-volume';
import { FeedbackDelay } from 'tone';
import time from '@generative-music/time-tonejs';
import makeInstrument from '@generative-music/instrument-tonejs';
import getSampledInstrument from '../util/get-sampled-instrument';

const makePiece = master =>
  getSampledInstrument('kasper-singing-bowls').then(bowls => {
    const delay = new FeedbackDelay({
      wet: 0.5,
      delayTime: delayTimeInSeconds,
      feedback: delayFeedback,
    });
    master.volume.value = volume;
    bowls.chain(delay, master);
    const instruments = [makeInstrument({ toneInstrument: bowls })];
    piece({ instruments, time });
    return () => {
      [(bowls, delay)].forEach(node => node.dispose());
    };
  });

export default makePiece;
