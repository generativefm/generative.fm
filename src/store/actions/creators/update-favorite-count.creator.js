import UPDATE_FAVORITE_COUNT from '../types/update-favorite-count.type';

const updateFavoriteCount = payload => ({
  type: UPDATE_FAVORITE_COUNT,
  payload,
});

export default updateFavoriteCount;
