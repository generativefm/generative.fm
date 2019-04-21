import REMOVE_RECORDING_GENERATION from '../types/remove-recording-generation.type';

const removeRecordingGeneration = recordingId => ({
  type: REMOVE_RECORDING_GENERATION,
  payload: recordingId,
});

export default removeRecordingGeneration;
