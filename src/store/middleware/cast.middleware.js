import * as Tone from 'tone';
import castApplicationId from '@config/cast-application-id';
import piecesById from '@pieces/by-id';
import artists from '@data/artists';
import play from '@store/actions/creators/play.creator';
import streamDestination from './stream-destination';

const CUSTOM_MESSAGE_NAMESPACE = 'urn:x-cast:fm.generative';

const makeHandleIceCandidate = castSession => ({ candidate }) => {
  if (candidate !== null) {
    castSession.sendMessage(
      CUSTOM_MESSAGE_NAMESPACE,
      JSON.stringify({ type: 'ice_candidate', candidate })
    );
  }
};

const makeHandleNegotiationNeeded = (castSession, peerConnection) => () => {
  peerConnection.createOffer().then(offer => {
    peerConnection
      .setLocalDescription(offer)
      .then(() =>
        castSession.sendMessage(CUSTOM_MESSAGE_NAMESPACE, JSON.stringify(offer))
      );
  });
};

const updateReceiverMetadata = (castSession, currentPieceId) => {
  const { title, image, releaseDate, artist } = piecesById[currentPieceId];
  castSession.sendMessage(
    CUSTOM_MESSAGE_NAMESPACE,
    JSON.stringify({
      title,
      artist: artists[artist],
      releaseDate: releaseDate.toISOString(),
      imageUrl: image,
      type: 'metadata',
    })
  );
};

const handleCastStateConnected = (castContext, store) => {
  Tone.Destination.mute = true;
  const peerConnection = new RTCPeerConnection(null);
  const castSession = castContext.getCurrentSession();
  castSession.addMessageListener(CUSTOM_MESSAGE_NAMESPACE, (ns, message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'answer': {
        peerConnection.setRemoteDescription(data);
        break;
      }
      case 'ice_candidate': {
        peerConnection.addIceCandidate(data.candidate);
        break;
      }
      default: {
        // nothing
      }
    }
  });

  peerConnection.onicecandidate = makeHandleIceCandidate(castSession);
  peerConnection.onnegotiationneeded = makeHandleNegotiationNeeded(
    castSession,
    peerConnection
  );

  streamDestination.stream.getAudioTracks().forEach(track => {
    peerConnection.addTrack(track, streamDestination.stream);
  });

  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.NOT_CONNECTED) {
      Tone.Destination.mute = false;
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      //eslint-disable-next-line no-use-before-define
      attachConnectedListener(castContext, store);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );

  const { selectedPieceId, isPlaying } = store.getState();
  if (selectedPieceId !== null) {
    updateReceiverMetadata(castSession, selectedPieceId);
  }
  if (!isPlaying) {
    store.dispatch(play());
  }
};

const attachConnectedListener = (castContext, store) => {
  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.CONNECTED) {
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      handleCastStateConnected(castContext, store);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );
};

const castMiddleware = store => next => {
  let isCasting = () => false;
  window.__onGCastApiAvailable = isAvailable => {
    if (isAvailable) {
      const { cast } = window;
      const castContext = cast.framework.CastContext.getInstance();
      castContext.setOptions({
        receiverApplicationId: castApplicationId,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      attachConnectedListener(castContext, store);
      isCasting = () =>
        castContext.getCastState() === cast.framework.CastState.CONNECTED;
    }
  };

  return action => {
    if (isCasting()) {
      const currentState = store.getState();
      const result = next(action);
      const nextState = store.getState();
      if (
        currentState.selectedPieceId !== nextState.selectedPieceId &&
        nextState.selectedPieceId !== null
      ) {
        const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
        updateReceiverMetadata(castSession, nextState.selectedPieceId);
      }
      return result;
    }
    return next(action);
  };
};

export default castMiddleware;
