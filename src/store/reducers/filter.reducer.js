import CHANGE_FILTER from '../actions/types/change-filter.type';
import ALL_FILTER from '@config/all-filter';

const filterReducer = (state = ALL_FILTER, action) =>
  action.type === CHANGE_FILTER ? action.payload : state;

export default filterReducer;
