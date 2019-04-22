import START_RECORDING_GENERATION from '../types/start-recording-generation.type';

const startRecordingGeneration = recordingId => ({
  type: START_RECORDING_GENERATION,
  payload: recordingId,
});

export default startRecordingGeneration;
