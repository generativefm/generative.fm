import Tone from 'tone';
import { Scale, Note } from 'tonal';
import getSampledInstrument from '../util/get-sampled-instrument';

const tonic = Note.names()[Math.floor(Math.random() * Note.names().length)];
const scalePitchClasses = Scale.notes(tonic, 'major');
const notes = [3, 4, 5, 6].reduce(
  (allNotes, octave) =>
    allNotes.concat(scalePitchClasses.map(pc => `${pc}${octave}`)),
  []
);

const getOffsetProgression = () => {
  const progression = [];
  const startingStep = Math.random() < 0.5 ? 0 : 1;
  const largestStep = Math.random() * (5 - startingStep) + startingStep;
  for (
    let step = startingStep;
    step <= largestStep;
    step += Math.random() < 0.5 ? 1 : 2
  ) {
    const chord = [];
    for (let i = step; i >= 0; i -= 2) {
      if (i === 0) {
        chord.push(i);
      } else {
        chord.push(i, -i);
      }
    }
    progression.push(chord);
  }
  return progression;
};

const makeOffsetProgressionToIndiciesProgression = startingIndex => offsetProgression =>
  offsetProgression.map(chord =>
    chord
      .map(offset => startingIndex + offset)
      .filter(index => index >= 0 && index < notes.length)
  );

const indiciesProgressionToNoteProgression = indiciesProgression =>
  indiciesProgression.map(chord => chord.map(index => notes[index]));

const pipe = (...fns) => x => fns.reduce((y, fn) => fn(y), x);

const getProgression = () =>
  pipe(
    getOffsetProgression,
    makeOffsetProgressionToIndiciesProgression(
      Math.floor(Math.random() * notes.length)
    ),
    indiciesProgressionToNoteProgression
  )();

const playProgression = (piano, onTimeoutCreated) => {
  const progression = getProgression();
  const perChordDelay = Math.random() * 3 + 2;
  progression.forEach((chord, i) => {
    chord.forEach(note =>
      piano.triggerAttack(note, `+${i * perChordDelay + Math.random() / 10}`)
    );
  });
  const timeout = setTimeout(() => {
    playProgression(piano, onTimeoutCreated);
  }, (Math.random() * 3 + (progression.length + 1) * perChordDelay) * 1000);
  onTimeoutCreated(timeout);
};

const makePiece = master =>
  getSampledInstrument('vsco2-piano-mf').then(piano => {
    const reverb = new Tone.Freeverb({ roomSize: 0.6 });
    piano.chain(reverb, master);
    let lastTimeout;
    const onTimeoutCreated = timeout => {
      lastTimeout = timeout;
    };
    playProgression(piano, onTimeoutCreated);
    return () => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      [reverb, piano].forEach(node => node.dispose());
    };
  });

export default makePiece;
