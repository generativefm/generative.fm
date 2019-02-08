const ONE_MINUTE_MS = 60 * 1000;
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS;

const formatPlayTime = playTimeMS => {
  if (playTimeMS >= ONE_HOUR_MS) {
    const hoursPlayed = Math.floor(playTimeMS / ONE_HOUR_MS);
    return `Played for ${hoursPlayed} hour${hoursPlayed > 1 ? 's' : ''}`;
  } else if (playTimeMS >= ONE_MINUTE_MS) {
    const minutesPlayed = Math.floor(playTimeMS / ONE_MINUTE_MS);
    return `Played for ${minutesPlayed} minute${minutesPlayed > 1 ? 's' : ''}`;
  } else if (playTimeMS > 0) {
    return 'Barely played';
  }
  return 'Never played';
};

export default formatPlayTime;
