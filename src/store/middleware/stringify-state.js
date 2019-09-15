const stringifyState = state =>
  JSON.stringify(
    Object.assign({}, state, {
      favorites: [...state.favorites],
      cachedPieceIds: [...state.cachedPieceIds],
    })
  );

export default stringifyState;
