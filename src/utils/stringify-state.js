import mapToObj from '@utils/map-to-obj';

const stringifyState = state =>
  JSON.stringify(
    Object.assign({}, state, {
      favorites: [...state.favorites],
      cachedPieceIds: [...state.cachedPieceIds],
      globalPlayTime: mapToObj(state.globalPlayTime),
      favoriteCount: mapToObj(state.favoriteCount),
    })
  );

export default stringifyState;
