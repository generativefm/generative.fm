import Tone from 'tone';
import { Note } from 'tonal';
import getSampledInstrument from '../util/get-sampled-instrument';

const OCTAVES = [2, 3, 4];
const notes = OCTAVES.reduce(
  (allNotes, octave) =>
    allNotes.concat(Note.names().map(pitchClass => `${pitchClass}${octave}`)),
  []
);

const playNote = (instrument, sineSynth, onTimeoutCreated, lastNoteMidi) => {
  const newNotes = notes.filter(n => Note.midi(n) !== lastNoteMidi);
  const note = newNotes[Math.floor(Math.random() * newNotes.length)];
  instrument.triggerAttack(note, '+1.5');
  const pitchClass = Note.pc(note);
  sineSynth.triggerAttackRelease(`${pitchClass}1`, 5, '+1.5');
  const timeout = setTimeout(() => {
    playNote(instrument, sineSynth, onTimeoutCreated, Note.midi(note));
  }, Math.random() * 10000 + 10000);
  onTimeoutCreated(timeout);
};

const makePiece = master =>
  getSampledInstrument('otherness').then(instrument => {
    const sineSynth = new Tone.MonoSynth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 3,
        release: 10,
      },
    }).connect(master);

    instrument.connect(master);

    sineSynth.volume.value = -25;
    instrument.volume.value = -5;

    let lastTimeout;
    const onTimeoutCreated = timeout => {
      lastTimeout = timeout;
    };

    playNote(instrument, sineSynth, onTimeoutCreated);

    return () => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      [sineSynth, instrument].forEach(node => node.dispose());
    };
  });

export default makePiece;
