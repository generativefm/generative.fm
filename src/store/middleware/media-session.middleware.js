import pieces from '@pieces';
import play from '../actions/creators/play.creator';
import stop from '../actions/creators/stop.creator';
import next from '../actions/creators/next.creator';
import previous from '../actions/creators/previous.creator';
import SELECT_PIECE from '../actions/types/select-piece.type';

const mediaSessionActionReduxCreatorPairs = [
  ['play', play],
  ['pause', stop],
  ['nexttrack', next],
  ['previoustrack', previous],
];

const updateMetadata = selectedPieceId => {
  const selectedPiece = pieces.find(({ id }) => id === selectedPieceId);
  if (typeof selectedPiece !== 'undefined') {
    const { title, artist, image } = selectedPiece;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: 'Generative.fm',
      artwork: [{ src: image, type: 'image/png' }],
    });
  }
};

const mediaSessionMiddleware = store => nextMiddleware => {
  if (navigator.mediaSession) {
    mediaSessionActionReduxCreatorPairs.forEach(
      ([mediaSessionAction, reduxActionCreator]) => {
        navigator.mediaSession.setActionHandler(mediaSessionAction, () => {
          store.dispatch(reduxActionCreator());
        });
      }
    );
    const { selectedPieceId } = store.getState();
    updateMetadata(selectedPieceId);
    return action => {
      if (action.type === SELECT_PIECE) {
        updateMetadata(action.payload);
      }
    };
  }
  return action => nextMiddleware(action);
};

export default mediaSessionMiddleware;
