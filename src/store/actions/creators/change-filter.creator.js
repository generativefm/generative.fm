import CHANGE_FILTER from '../types/change-filter.type';

const changeFilter = filter => ({ type: CHANGE_FILTER, payload: filter });

export default changeFilter;
