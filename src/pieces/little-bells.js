import piece from '@generative-music/piece-little-bells';
import delayTimeInSeconds from '@generative-music/piece-little-bells/config/delay-time-in-seconds';
import delayFeedback from '@generative-music/piece-little-bells/config/delay-feedback';
import freeverbRoomSize from '@generative-music/piece-little-bells/config/freeverb-room-size';
import freeverbDampening from '@generative-music/piece-little-bells/config/freeverb-dampening';
import { FeedbackDelay, Freeverb } from 'tone';
import time from '@generative-music/time-tonejs';
import makeInstrument from '@generative-music/instrument-tonejs';
import getSampledInstrument from '../util/get-sampled-instrument';

const makePiece = master =>
  getSampledInstrument('vsco2-glock').then(glock => {
    const delay = new FeedbackDelay({
      delayTime: delayTimeInSeconds,
      feedback: delayFeedback,
      wet: 0.5,
    });
    const verb = new Freeverb(freeverbRoomSize, freeverbDampening);
    glock.chain(delay, verb, master);
    const instruments = [makeInstrument({ toneInstrument: glock })];
    piece({ instruments, time });
    return () => {
      [(glock, delay, verb)].forEach(node => node.dispose());
    };
  });

export default makePiece;
