import Tone from 'tone';

const stop = () => {
  Tone.Transport.stop();
  Tone.Transport.cancel();
};

export default stop;
