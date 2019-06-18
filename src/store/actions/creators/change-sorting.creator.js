import CHANGE_SORTING from '../types/change-sorting.type';

const changeSorting = (key, isReversed = false) => ({
  type: CHANGE_SORTING,
  payload: { key, isReversed },
});

export default changeSorting;
