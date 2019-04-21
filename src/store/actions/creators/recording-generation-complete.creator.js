import RECORDING_GENERATION_COMPLETE from '../types/recording-generation-complete.type';

const recordingGenerationComplete = ({ objectUrl, recordingId }) => ({
  type: RECORDING_GENERATION_COMPLETE,
  payload: { objectUrl, recordingId },
});

export default recordingGenerationComplete;
