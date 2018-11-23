import Tone from 'tone';

const stop = piece => {
  piece.volumeNode.mute = true;
  piece.volumeNode.dispose();
  Tone.Transport.stop();
  Tone.Transport.cancel();
};

export default stop;
