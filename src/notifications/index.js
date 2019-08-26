const patreon = {
  message: 'Consider supporting Generative.fm on Patreon',
  link: 'https://www.patreon.com/bePatron?u=2484731',
  getIsTriggered: (/*state*/) => false,
  // Reflect.ownKeys(state.playTime).reduce(
  //   (totalPlayTimeMS, pieceId) => totalPlayTimeMS + state.playTime[pieceId],
  //   0
  // ) >=
  // 10 * 60 * 60 * 1000,
};

export default { patreon };
