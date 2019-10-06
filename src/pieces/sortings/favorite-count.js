const favoriteCount = {
  label: 'global favorites',
  defaultDirectionLabel: 'most',
  reverseDirectionLabel: 'least',
  fn: (pieces, state) =>
    pieces.slice(0).sort((a, b) => {
      const aFavorites = state.favoriteCount.has(a.id)
        ? state.favoriteCount.get(a.id)
        : 0;
      const bFavorites = state.favoriteCount.has(b.id)
        ? state.favoriteCount.get(b.id)
        : 0;
      return bFavorites - aFavorites;
    }),
};

export default favoriteCount;
