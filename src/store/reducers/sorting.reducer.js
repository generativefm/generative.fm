import CHANGE_SORTING from '../actions/types/change-sorting.type';

const sortingReducer = (
  state = { key: 'releaseDate', isReversed: false },
  action
) => (action.type === CHANGE_SORTING ? action.payload : state);

export default sortingReducer;
