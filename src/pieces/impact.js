import Tone, { Transport, Sampler, Frequency, now } from 'tone';
import samples from '../../samples/samples.json';
import { minor7th } from '../theory/chords';
import arpeggiateOnce from '../patterns/arpeggiate-once';
import getRandomElement from '../util/get-random-element';
import getRandomBetween from '../util/get-random-between';
import getRandomIntBetween from '../util/get-random-int-between';
import pianoSamplesName from '../config/piano-samples-name';

const INSTRUMENT = pianoSamplesName;

const pianoSamples = samples[INSTRUMENT];
const notes = Object.keys(pianoSamples);

const TONIC = 'A#';
const CHORD = minor7th(TONIC);
const REVERSE_OCTAVES = [1, 2];
const REGULAR_OCTAVES = [4, 5];
const REGULAR_ARPEGGIATE_MIN_TIME = 0.5;
const REGULAR_ARPEGGIATE_MAX_TIME = 2;
const EXTRA_NOTE_CHANCE_P = 0.3;
const EXTRA_NOTE_VELOCITY = 0.3;
const EXTRA_CHORD_CHANCE_P = 0.2;

const getBuffer = url =>
  new Promise((resolve, reject) => {
    const newBuffer = new Tone.Buffer({
      url,
      onload: () => resolve(newBuffer),
      onerror: err => reject(err),
    });
  });

const buffersToObj = buffers =>
  buffers.reduce((o, buffer, i) => {
    const note = notes[i];
    o[note] = buffer;
    return o;
  }, {});

const makeNextNote = (
  reverseInstrument,
  regularInstrument,
  durationsByMidi
) => {
  const nextNote = () => {
    const note = getRandomElement(CHORD);
    const reverseNote = `${note}${getRandomElement(REVERSE_OCTAVES)}`;
    const inversion = getRandomIntBetween(0, 4);
    const regularOctave = getRandomElement(REGULAR_OCTAVES);
    const regularNotes = minor7th(`${note}${regularOctave}`, inversion);
    Transport.scheduleOnce(() => {
      reverseInstrument.triggerAttack(reverseNote);
      //eslint-disable-next-line new-cap
      const midi = Frequency(reverseNote).toMidi();
      if (typeof durationsByMidi[midi] === 'undefined') {
        durationsByMidi[midi] =
          reverseInstrument._activeSources[midi][0].source.buffer.duration;
      }
      Transport.scheduleOnce(() => {
        arpeggiateOnce({
          instrument: regularInstrument,
          notes: regularNotes,
          withinTime: getRandomBetween(
            REGULAR_ARPEGGIATE_MIN_TIME,
            REGULAR_ARPEGGIATE_MAX_TIME
          ),
        });
        nextNote();
        if (Math.random() < EXTRA_NOTE_CHANCE_P) {
          const extraNote = getRandomElement(regularNotes);
          Transport.scheduleOnce(() => {
            regularInstrument.triggerAttack(
              extraNote,
              now(),
              EXTRA_NOTE_VELOCITY
            );
          }, `+${durationsByMidi[midi] / 4}`);
        } else if (Math.random() < EXTRA_CHORD_CHANCE_P) {
          let extraChordOctave = regularOctave;
          while (
            REGULAR_OCTAVES.length > 1 &&
            extraChordOctave === regularOctave
          ) {
            extraChordOctave = getRandomElement(REGULAR_OCTAVES);
          }
          const extraNotes = minor7th(`${note}${extraChordOctave}`, inversion);
          Transport.scheduleOnce(() => {
            arpeggiateOnce({
              instrument: regularInstrument,
              notes: extraNotes,
              withinTime: getRandomBetween(
                REGULAR_ARPEGGIATE_MIN_TIME,
                REGULAR_ARPEGGIATE_MAX_TIME
              ),
              velocity: EXTRA_NOTE_VELOCITY,
            });
          }, `+${durationsByMidi[midi] / 4}`);
        }
      }, `+${durationsByMidi[midi]}`);
    }, `+1`);
  };
  return nextNote;
};

const piece = (master, log) => {
  log('impact');
  const noteBuffers = notes.map(note => getBuffer(pianoSamples[note]));
  return Promise.all(noteBuffers).then(buffers => {
    const bufferCopies = buffers.map(buffer =>
      new Tone.Buffer().fromArray(buffer.toArray())
    );
    const regularInstrument = new Sampler(buffersToObj(bufferCopies));
    buffers.forEach(buffer => {
      buffer.reverse = true;
    });
    const reverseInstrument = new Sampler(buffersToObj(buffers));
    const durationsByMidi = {};
    const nextNote = makeNextNote(
      reverseInstrument,
      regularInstrument,
      durationsByMidi
    );
    nextNote();
    [reverseInstrument, regularInstrument].forEach(i => i.connect(master));
    log('ready');
  });
};

export default piece;
