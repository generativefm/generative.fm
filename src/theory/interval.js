const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const LETTERS = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];
const NOTES = OCTAVES.reduce(
  (notes, octave) => notes.concat(LETTERS.map(letter => `${letter}${octave}`)),
  []
);

const makeWrappedGet = arr => {
  return (index, change) => {
    const nextIndex = ((index + change) % arr.length + arr.length) % arr.length;
    return arr[nextIndex];
  };
};

const getNextLetter = makeWrappedGet(LETTERS);
const getNextNote = makeWrappedGet(NOTES);

const _interval = (note, steps) => {
  const octaveMatch = note.match(/\d$/);
  let getNextFn;
  let originArr;
  if (octaveMatch === null) {
    getNextFn = getNextLetter;
    originArr = LETTERS;
  } else {
    getNextFn = getNextNote;
    originArr = NOTES;
  }
  const currentIndex = originArr.findIndex(n => n === note);
  return getNextFn(currentIndex, steps);
};

const curry2 = fn => arg1 => arg2 => fn(arg1, arg2);
const swap2 = fn => (arg1, arg2) => fn(arg2, arg1);

const interval = (arg1, arg2) => {
  const getResult = typeof arg1 === 'string' ? _interval : swap2(_interval);
  return typeof arg2 === 'undefined'
    ? curry2(getResult)(arg1)
    : getResult(arg1, arg2);
};

export default interval;
