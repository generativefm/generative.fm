import QUEUE_RECORDING_GENERATION from '../actions/types/queue-recording-generation.type';

const DEFAULT_RECORDING_LENGTH_MINUTES = 10;

const lastRecordingGenerationLengthReducer = (
  state = DEFAULT_RECORDING_LENGTH_MINUTES,
  action
) =>
  action.type === QUEUE_RECORDING_GENERATION
    ? action.payload.lengthInMinutes
    : state;

export default lastRecordingGenerationLengthReducer;
