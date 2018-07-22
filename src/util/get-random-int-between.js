import getRandomBetween from './get-random-between';

const getRandomIntBetween = (min, max) =>
  Math.floor(getRandomBetween(min, max));

export default getRandomIntBetween;
