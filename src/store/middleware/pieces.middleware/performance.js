import * as Tone from 'tone';
import uuid from 'uuid';

const performance = (piece, volumeNode) => {
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
    piece,
    volumeNode,
    performanceId: uuid(),
    isLoaded: false,
    isStopped: () => isStopped,
    addCleanupFn: fn => cleanUpFns.push(fn),
    stop: () => cleanUpFns.forEach(fn => fn()),
  };
};

export default performance;
