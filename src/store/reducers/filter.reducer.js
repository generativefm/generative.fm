import CHANGE_FILTER from '../actions/types/change-filter.type';

const filterReducer = (state = 'all', action) =>
  action.type === CHANGE_FILTER ? action.payload : state;

export default filterReducer;
