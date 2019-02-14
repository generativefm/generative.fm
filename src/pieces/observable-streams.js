import Tone from 'tone';
import { Scale, Note, Chord } from 'tonal';
import { of, from, timer } from 'rxjs';
import {
  concatMap,
  delay,
  repeat,
  mergeMap,
  delayWhen,
  filter,
} from 'rxjs/operators';
import getSampledInstrument from '../util/get-sampled-instrument';

const toss = (pcs = [], octaves = []) =>
  octaves.reduce(
    (notes, octave) => notes.concat(pcs.map(pc => `${pc}${octave}`)),
    []
  );

const OCTAVES = [4];
const TONIC = 'C';
const SCALE = 'major';
const PITCH_CLASSES = Scale.notes(TONIC, SCALE);
const NOTES = toss(PITCH_CLASSES, OCTAVES);

const CHORDS_BY_NOTE = Scale.chords(SCALE)
  .filter(name => name !== '5' && name !== '64')
  .reduce(
    (chords, name) =>
      chords.concat(
        OCTAVES.map(octave => Chord.notes(`${TONIC}${octave}${name}`))
      ),
    []
  )
  .reduce((map, chord) => {
    chord.forEach(note => {
      if (map.has(note)) {
        map.set(note, map.get(note).concat([chord]));
      } else {
        map.set(note, [chord]);
      }
    });
    return map;
  }, new Map());

const minDelay = 700;

const getDelayTimeInMS = () => Math.random() * 10000 + minDelay;

const octaved = (p, octaveChange) => source =>
  source.pipe(
    mergeMap(
      note =>
        NOTES.includes(note) && Math.random() < p
          ? from([note, `${Note.pc(note)}${Note.oct(note) + octaveChange}`])
          : of(note)
    )
  );

const humanize = () => source =>
  source.pipe(mergeMap(note => of(note).pipe(delay(Math.random() * 100))));

const delayed = () => source =>
  source.pipe(
    delayWhen(() => timer(Math.random() < 0.2 ? getDelayTimeInMS() : 0))
  );

const shortTermThrottleByNote = timeMS => {
  const lastTimes = new Map();
  return source =>
    source.pipe(
      filter(note => {
        const now = Date.now();
        if (lastTimes.has(note)) {
          const lastTime = lastTimes.get(note);
          if (now - lastTime < timeMS) {
            return false;
          }
        }
        lastTimes.set(note, now);
        return true;
      })
    );
};

const chord = p => source =>
  source.pipe(
    mergeMap(note => {
      if (CHORDS_BY_NOTE.has(note) && Math.random() < p) {
        const chordsWithNote = CHORDS_BY_NOTE.get(note);
        return from(
          chordsWithNote[Math.floor(Math.random() * chordsWithNote.length)]
        );
      }
      return of(note);
    })
  );

const notes$ = of(null).pipe(
  concatMap(() =>
    of(NOTES[Math.floor(Math.random() * NOTES.length)]).pipe(
      delay(getDelayTimeInMS())
    )
  ),
  repeat(),
  octaved(0.2, 1),
  octaved(0.2, -1),
  octaved(0.4, -2),
  delayed(),
  shortTermThrottleByNote(3000),
  chord(0.2),
  humanize()
);

const makePiece = master =>
  Promise.all([
    getSampledInstrument('vsco2-piano-mf'),
    getSampledInstrument('vsco2-violin-arcvib', {
      release: 4,
      curve: 'linear',
      volume: -15,
    }),
    getSampledInstrument('sso-cor-anglais', {
      volume: -40,
    }),
  ]).then(([piano, violin, corAnglais]) => {
    const pianoVerb = new Tone.Freeverb({ roomSize: 0.5, wet: 0.6 });
    piano.chain(pianoVerb, master);

    const violinVerb = new Tone.Freeverb({ roomSize: 0.9, wet: 1 });
    const violinDelay = new Tone.FeedbackDelay({
      feedback: 0.75,
      delayTime: 0.08,
      wet: 0.5,
    });
    violin.chain(violinVerb, violinDelay, master);

    const corAnglaisVerb = new Tone.Freeverb({ roomSize: 0.9, wet: 1 });
    const corAnglaisDelay1 = new Tone.FeedbackDelay({
      feedback: 0.75,
      delayTime: 0.5,
      wet: 0.5,
    });
    const corAnglaisDelay2 = new Tone.FeedbackDelay({
      feedback: 0.7,
      delayTime: 5,
      wet: 0.5,
    });
    corAnglais.chain(
      corAnglaisVerb,
      corAnglaisDelay1,
      corAnglaisDelay2,
      master
    );

    const notes = ['C4', 'E4', 'G4', 'C5', 'E5', 'G5'];
    const intervals = notes.map(() => Math.random() * 10000 + 10000);
    const minInterval = Math.min(...intervals);
    const timeoutsToClear = [];
    const intervalsToClear = [];
    notes.forEach((note, i) => {
      const interval = intervals[i];
      timeoutsToClear.push(
        setTimeout(() => {
          corAnglais.triggerAttack(note, '+1');
          intervalsToClear.push(
            setInterval(() => {
              corAnglais.triggerAttack(note, '+1');
            }, interval)
          );
        }, interval - minInterval)
      );
    });
    let lastViolinTime = Date.now();
    const noteSubscription = notes$.subscribe(note => {
      if (
        Math.random() < 0.1 &&
        Note.oct(note) > 3 &&
        Date.now() - lastViolinTime > 20000
      ) {
        lastViolinTime = Date.now();
        violin.triggerAttack(note, '+1');
      } else {
        piano.triggerAttack(note, '+1');
      }
    });
    return () => {
      [
        piano,
        violin,
        corAnglais,
        pianoVerb,
        violinVerb,
        violinDelay,
        corAnglaisVerb,
        corAnglaisDelay1,
        corAnglaisDelay2,
      ].forEach(node => node.dispose());
      timeoutsToClear.forEach(timeout => clearTimeout(timeout));
      intervalsToClear.forEach(interval => clearInterval(interval));
      noteSubscription.unsubscribe();
    };
  });

export default makePiece;
