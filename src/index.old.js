import Tone from 'tone';
import piece from './pieces/aisatsana';
import log from './util/log';

Tone.context.latencyHint = 'playback';

log('creating piece');
piece.then(() => {
  log('starting piece');
  Tone.Transport.start('+0.1');
});
window.Tone = Tone;
