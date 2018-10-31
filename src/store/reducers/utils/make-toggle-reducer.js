const makeToggleReducer = (
  enableActionType,
  disableActionType,
  defaultState
) => (state = defaultState, action) => {
  switch (action.type) {
    case enableActionType: {
      return true;
    }
    case disableActionType: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default makeToggleReducer;
