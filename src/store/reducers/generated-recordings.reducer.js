import clone from 'clone';
import QUEUE_RECORDING_GENERATION from '../actions/types/queue-recording-generation.type';
import START_RECORDING_GENERATION from '../actions/types/start-recording-generation.type';
import RECORDING_GENERATION_COMPLETE from '../actions/types/recording-generation-complete.type';
import REMOVE_RECORDING_GENERATION from '../actions/types/remove-recording-generation.type';

const generatedRecordingsReducer = (state = {}, action) => {
  switch (action.type) {
    case QUEUE_RECORDING_GENERATION: {
      return Object.assign({}, clone(state), {
        [action.payload.recordingId]: Object.assign({}, action.payload, {
          isInProgress: false,
          url: '',
        }),
      });
    }
    case START_RECORDING_GENERATION: {
      const recordingId = action.payload;
      const recording = state[recordingId];
      return Object.assign({}, clone(state), {
        [recordingId]: Object.assign({}, recording, { isInProgress: true }),
      });
    }
    case RECORDING_GENERATION_COMPLETE: {
      const { recordingId, objectUrl } = action.payload;
      const recording = state[recordingId];
      return Object.assign({}, clone(state), {
        [recordingId]: Object.assign({}, recording, {
          url: objectUrl,
          isInProgress: false,
        }),
      });
    }
    case REMOVE_RECORDING_GENERATION: {
      const recordingId = action.payload;
      const newState = clone(state);
      delete newState[recordingId];
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default generatedRecordingsReducer;
