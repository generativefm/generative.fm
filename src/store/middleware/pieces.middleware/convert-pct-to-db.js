const MAX_VOLUME_DB = 0;
const MIN_VOLUME_DB = -50;
const PCT_EXPONENT = 0.5;

const convertPctToDb = pct =>
  (pct / 100) ** PCT_EXPONENT * (MAX_VOLUME_DB - MIN_VOLUME_DB) + MIN_VOLUME_DB;

export default convertPctToDb;
