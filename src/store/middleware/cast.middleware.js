import castApplicationId from '@config/cast-application-id';
import streamDestination from './stream-destination';
import piecesById from '@pieces/by-id';

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
    console.log('sending offer');
    peerConnection
      .setLocalDescription(offer)
      .then(() =>
        castSession.sendMessage(CUSTOM_MESSAGE_NAMESPACE, JSON.stringify(offer))
      );
  });
};

const updateReceiverMetadata = (castSession, currentPieceId) => {
  // TODO handle nothing selected
  const { title, image, releaseDate } = piecesById[currentPieceId];
  castSession.sendMessage(
    CUSTOM_MESSAGE_NAMESPACE,
    JSON.stringify({
      title,
      releaseDate: releaseDate.toISOString(),
      imageUrl: image,
      type: 'metadata',
    })
  );
};

const handleCastStateConnected = (castContext, store) => {
  const peerConnection = new RTCPeerConnection(null);
  const castSession = castContext.getCurrentSession();
  castSession.addMessageListener(CUSTOM_MESSAGE_NAMESPACE, (ns, message) => {
    const data = JSON.parse(message);
    console.log(data);
    switch (data.type) {
      case 'answer': {
        console.log('answer received');
        return peerConnection.setRemoteDescription(data);
      }
      case 'ice_candidate': {
        return peerConnection.addIceCandidate(data.candidate);
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
  const connectTime = Date.now();

  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.NOT_CONNECTED) {
      const disconnectTime = Date.now();
      console.log(`Disconnected after ${disconnectTime - connectTime}ms`);
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      console.log('reattaching listener');
      //eslint-disable-next-line no-use-before-define
      attachConnectedListener(castContext, store);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );

  const { selectedPieceId } = store.getState();

  updateReceiverMetadata(castSession, selectedPieceId);
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
  window['__onGCastApiAvailable'] = isAvailable => {
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
      if (currentState.selectedPieceId !== nextState.selectedPieceId) {
        const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
        updateReceiverMetadata(castSession, nextState.selectedPieceId);
      }
      return result;
    }
    return next(action);
  };
};

export default castMiddleware;
