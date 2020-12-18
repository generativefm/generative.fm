import SET_IMPORTED from '../actions/types/set-imported.type';

const isImportedReducer = (state = false, action) =>
  state || action.type === SET_IMPORTED;

export default isImportedReducer;
