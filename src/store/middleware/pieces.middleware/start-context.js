import Tone from 'tone';

// "inspired by" (read: ripped off) https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
const startAudioContext = () => {
  if (Tone.context.state && Tone.context.state !== 'running') {
    // this accomplishes the iOS specific requirement
    const buffer = Tone.context.createBuffer(1, 1, Tone.context.sampleRate);
    const source = Tone.context.createBufferSource();
    source.buffer = buffer;
    source.connect(Tone.context.destination);
    source.start(0);

    // resume the audio context
    if (Tone.context.resume) {
      Tone.context.resume();
    }
  }
};

export default startAudioContext;
