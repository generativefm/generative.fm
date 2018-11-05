// see https://github.com/tambien/StartAudioContext
import Tone from 'tone';

const initializeAudioContext = () => {
  // For iOS devices, play a silent sound
  const buffer = Tone.context.createBuffer(1, 1, Tone.context.sampleRate);
  const source = Tone.context.createBufferSource();
  source.buffer = buffer;
  source.connect(Tone.context.destination);
  source.start(0);

  if (Tone.context.resume) {
    Tone.context.resume();
  }
};

export default initializeAudioContext;
