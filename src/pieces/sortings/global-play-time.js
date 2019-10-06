const globalPlayTime = {
  label: 'global play time',
  defaultDirectionLabel: 'most',
  reverseDirectionLabel: 'least',
  fn: (pieces, state) =>
    pieces.slice(0).sort((a, b) => {
      const aPlayTime = state.globalPlayTime.has(a.id)
        ? state.globalPlayTime.get(a.id)
        : 0;
      const bPlayTime = state.globalPlayTime.has(b.id)
        ? state.globalPlayTime.get(b.id)
        : 0;
      return bPlayTime - aPlayTime;
    }),
};

export default globalPlayTime;
