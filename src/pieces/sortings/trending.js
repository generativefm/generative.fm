const trending = {
  label: 'trending',
  defaultDirectionLabel: 'highest',
  reverseDirectionLabel: 'lowest',
  fn: (pieces, state) => {
    const now = Date.now();
    return pieces.slice(0).sort((a, b) => {
      const aTrend = state.globalPlayTime.has(a.id)
        ? state.globalPlayTime.get(a.id) / (now - a.releaseDate.valueOf())
        : 0;
      const bTrend = state.globalPlayTime.has(b.id)
        ? state.globalPlayTime.get(b.id) / (now - b.releaseDate.valueOf())
        : 0;
      return bTrend - aTrend;
    });
  },
};

export default trending;
