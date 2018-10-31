import SELECT_PIECE from '../actions/types/select-piece.type';
import ENABLE_SHUFFLE from '../actions/types/enable-shuffle.type';
import PREVIOUS from '../actions/types/previous.type';

const pieceHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_PIECE: {
      if (
        action.payload !== null &&
        action.payload !== state[state.length - 1]
      ) {
        return state.slice().concat([action.payload]);
      }
      return state;
    }
    case ENABLE_SHUFFLE: {
      return [];
    }
    case PREVIOUS: {
      if (action.payload !== null) {
        return state.slice(0, state.length - 2);
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default pieceHistoryReducer;
