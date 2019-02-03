import Tone from 'tone';

const stop = piece => {
  if (piece.played) {
    piece.volumeNode.mute = true;
    piece.volumeNode.dispose();
    Tone.Transport.stop();
    Tone.Transport.cancel();
    if (typeof piece.cleanUp === 'function') {
      piece.cleanUp();
    }
  }
};

export default stop;
