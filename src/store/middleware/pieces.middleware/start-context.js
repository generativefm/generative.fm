// "inspired by" https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
import { context } from 'tone';

const startAudioContext = () => {
  if (context.state && context.state !== 'running') {
    // this accomplishes the iOS specific requirement
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);

    // resume the audio context
    if (context.resume) {
      context.resume();
    }
  }
};

export default startAudioContext;
