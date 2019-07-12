import castApplicationId from '@config/cast-application-id';
import streamDestination from './stream-destination';

const CUSTOM_MESSAGE_NAMESPACE = 'urn:x-cast:fm.generative';

const makeHandleIceCandidate = castSession => ({ candidate }) => {
  if (candidate !== null) {
    castSession.sendMessage(
      CUSTOM_MESSAGE_NAMESPACE,
      JSON.stringify(candidate)
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

const handleCastStateConnected = castContext => {
  console.log('connected');
  const peerConnection = new RTCPeerConnection(null);
  const castSession = castContext.getCurrentSession();
  castSession.addMessageListener(CUSTOM_MESSAGE_NAMESPACE, (ns, message) => {
    const data = JSON.parse(message);
    if (data.type === 'answer') {
      console.log('answer received');
      peerConnection.setRemoteDescription(data);
    } else {
      peerConnection.addIceCandidate(data);
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
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      console.log('reattaching listener');
      //eslint-disable-next-line no-use-before-define
      attachConnectedListener(castContext);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );
};

const attachConnectedListener = castContext => {
  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.CONNECTED) {
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      handleCastStateConnected(castContext);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );
};

const castMiddleware = store => next => {
  window['__onGCastApiAvailable'] = isAvailable => {
    if (isAvailable) {
      const { cast } = window;
      const castContext = cast.framework.CastContext.getInstance();
      castContext.setOptions({
        receiverApplicationId: castApplicationId,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      attachConnectedListener(castContext);
    }
  };

  return action => next(action);
};

export default castMiddleware;
