import Tone from 'tone';

const stop = piece => {
  if (typeof piece.cleanUp === 'function') {
    piece.cleanUp();
  }
  piece.volumeNode.mute = true;
  piece.volumeNode.dispose();
  Tone.Transport.stop();
  Tone.Transport.cancel();
};

export default stop;
