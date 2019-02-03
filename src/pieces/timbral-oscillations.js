import { Scale, Note } from 'tonal';
import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';

const OCTAVES = [3, 4, 5, 6];
const MAX_STEP_DISTANCE = 2;
const MAX_PHRASE_LENGTH = 3;
const PHRASE_P_BASE = 0.5;

const pitchClasses = Scale.notes('C', 'major');

const notes = OCTAVES.reduce(
  (allNotes, octave) =>
    allNotes.concat(pitchClasses.map(pc => `${pc}${octave}`)),
  []
);

const getNextNotesForNote = note => {
  const index = notes.findIndex(n => n === note);
  const lowestIndex = Math.max(0, index - MAX_STEP_DISTANCE);
  return notes
    .slice(lowestIndex, index)
    .concat(notes.slice(index + 1, index + MAX_STEP_DISTANCE + 1));
};

const generatePhrase = (
  phrase = [notes[Math.floor(Math.random() * notes.length)]]
) => {
  if (
    phrase.length < MAX_PHRASE_LENGTH &&
    Math.random() < PHRASE_P_BASE ** phrase.length
  ) {
    const lastNote = phrase[phrase.length - 1];
    const possibleNextNotes = getNextNotesForNote(lastNote);
    return generatePhrase(
      phrase.concat([
        possibleNextNotes[Math.floor(Math.random() * possibleNextNotes.length)],
      ])
    );
  }
  return phrase;
};

const makePiece = master =>
  getSampledInstrument('vsco2-piano-mf').then(piano => {
    const reverb = new Tone.Freeverb({ roomSize: 0.7 });

    const delayFudge = Math.random() * 3;
    const delay = new Tone.FeedbackDelay({
      wet: 0.5,
      delayTime: 5 + delayFudge,
      feedback: 0.8 - delayFudge / 100,
    });

    const chorusLfo = new Tone.LFO({
      frequency: Math.random() / 100,
      phase: 90,
    });
    chorusLfo.start();
    const chorus = new Tone.Chorus({ wet: 0 });
    chorusLfo.connect(chorus.wet);

    const autoFilter = new Tone.AutoFilter({
      frequency: Math.random() / 100,
      baseFrequency: 250,
      octaves: 5,
      type: 'sine',
    });
    autoFilter.start();

    const pitchLfo = new Tone.LFO({
      frequency: Math.random() / 100,
      phase: 90,
    });
    pitchLfo.start();
    const pitchShift = new Tone.PitchShift({ pitch: 7 });
    pitchLfo.connect(pitchShift.wet);

    const tremoloFrequencyLfo = new Tone.LFO({
      frequency: Math.random() / 100,
      phase: 90,
      min: 0.1,
      max: 10,
    });
    const tremoloLfo = new Tone.LFO({
      frequency: Math.random() / 100,
      phase: 90,
    });
    tremoloFrequencyLfo.start();
    tremoloLfo.start();
    const tremolo = new Tone.Tremolo();
    tremoloFrequencyLfo.connect(tremolo.frequency);
    tremoloLfo.connect(tremolo.wet);
    tremolo.start();

    const compressor = new Tone.Compressor();

    piano.chain(
      pitchShift,
      delay,
      reverb,
      chorus,
      autoFilter,
      tremolo,
      compressor,
      master
    );

    const synth = new Tone.MonoSynth({
      oscillator: { type: 'sine' },
      volume: -45,
      envelope: { release: 3, attack: 0.5 },
    }).chain(delay);

    let lastTimeout;
    const playPhrase = (iterationsSinceLastSub = 6) => {
      const phrase = generatePhrase();
      const generateSub = iterationsSinceLastSub > 5 && Math.random() < 0.02;
      if (generateSub) {
        const lowestNoteMidi = phrase
          .map(note => Note.midi(note))
          .reduce(
            (lowestFound, noteMidi) => Math.min(lowestFound, noteMidi),
            Infinity
          );
        const lowestNote = Note.fromMidi(lowestNoteMidi);
        const lowestNotePitchClass = Note.pc(lowestNote);
        synth.triggerAttackRelease(`${lowestNotePitchClass}1`, 3);
      }
      phrase.forEach((note, i) => {
        if (Tone.context.state !== 'running') {
          Tone.context.resume();
        }
        piano.triggerAttack(note, `+${i * 1.5}`);
      });
      lastTimeout = setTimeout(() => {
        playPhrase(generateSub ? 0 : iterationsSinceLastSub + 1);
      }, Math.random() * 10000 + 10000);
    };
    playPhrase();
    return () => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      [
        reverb,
        delay,
        chorusLfo,
        chorus,
        autoFilter,
        pitchLfo,
        pitchShift,
        tremoloFrequencyLfo,
        tremoloLfo,
        tremolo,
        compressor,
        piano,
        synth,
      ].forEach(node => node.dispose());
    };
  });

export default makePiece;
