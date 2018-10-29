import Tone from 'tone';

const playPiece = piece => {
  //eslint-disable-next-line no-empty-function
  piece.makePiece(Tone.Master, () => {}).then(() => {
    Tone.Transport.start('+0.1');
  });
};

export default playPiece;
