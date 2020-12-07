import * as Tone from 'tone';
import uuid from 'uuid';

const performance = (piece, volumeNode) => {
  const performanceId = uuid();
  let isStopped = false;
  const cleanUpFns = [
    () => {
      isStopped = true;
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
    isStopped: () => isStopped,
  };
};

export default performance;
