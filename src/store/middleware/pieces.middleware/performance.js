import Tone from 'tone';
import uuid from 'uuid';

const performance = (piece, volumeNode) => {
  const performanceId = uuid();
  const cleanUpFns = [
    () => {
      volumeNode.mute = true;
      volumeNode.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    },
  ];
  return {
    performanceId,
    piece,
    volumeNode,
    isLoaded: false,
    addCleanupFn: fn => cleanUpFns.push(fn),
    stop: () => cleanUpFns.forEach(fn => fn()),
  };
};

export default performance;
