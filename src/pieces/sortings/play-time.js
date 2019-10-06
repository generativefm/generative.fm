const playTime = {
  label: 'play time',
  defaultDirectionLabel: 'most',
  reverseDirectionLabel: 'least',
  fn: (pieces, state) =>
    pieces.slice(0).sort((a, b) => {
      const aPlayTime =
        typeof state.playTime[a.id] === 'undefined' ? 0 : state.playTime[a.id];
      const bPlayTime =
        typeof state.playTime[b.id] === 'undefined' ? 0 : state.playTime[b.id];
      return bPlayTime - aPlayTime;
    }),
};

export default playTime;
