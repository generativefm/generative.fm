import getRandomIntBetween from './get-random-int-between';

const getRandomElement = arr => arr[getRandomIntBetween(0, arr.length)];

export default getRandomElement;
