import uuid from 'uuid';
import QUEUE_RECORDING_GENERATION from '../types/queue-recording-generation.type';

const queueRecordingGeneration = ({ pieceId, lengthInMinutes }) => ({
  type: QUEUE_RECORDING_GENERATION,
  payload: {
    pieceId,
    lengthInMinutes,
    recordingId: uuid(),
    queuedAtTime: Date.now(),
  },
});

export default queueRecordingGeneration;
