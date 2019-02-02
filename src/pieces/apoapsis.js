import Tone from 'tone';
import { Chord, Note } from 'tonal';
import sampleFormat from '../config/sample-format';
import samples from '../../samples/samples.json';

const makePiece = master => {
  const noise = new Tone.Noise('brown');
  const eq = new Tone.EQ3(-15, -Infinity, -Infinity).toMaster();
  eq.lowFrequency.value = Note.freq('C1');
  const lfo = new Tone.LFO({
    min: -50,
    max: -15,
    frequency: Math.random() / 100,
    phase: 45,
  });
  lfo.connect(eq.low);
  noise.connect(eq);
  lfo.start();
  noise.start();

  const delay1 = new Tone.FeedbackDelay({
    feedback: 0.7,
    delayTime: 0.2,
    wet: 0.5,
  });
  const delay2 = new Tone.FeedbackDelay({
    feedback: 0.6,
    delayTime: Math.random() * 10 + 20,
    wet: 0.5,
  });
  const reverb = new Tone.Freeverb({ roomSize: 0.9, wet: 0.5 });
  const stereoWidener = new Tone.StereoWidener();
  const widenerLfo = new Tone.LFO({ frequency: Math.random() / 100 });
  widenerLfo.connect(stereoWidener.width);
  reverb.chain(delay1, delay2, stereoWidener, master);

  const timeoutsToClear = [];
  const intervalsToClear = [];

  const violinReverb = new Tone.Freeverb({ roomSize: 0.8, wet: 0.5 });
  const violins = new Tone.Sampler(
    samples[`vsco2-violins-susvib-${sampleFormat}`],
    {
      release: 8,
      curve: 'linear',
      onload: () => {
        const notes = Chord.notes('C', 'maj7').reduce(
          (allNotes, pc) =>
            allNotes.concat([2, 3, 4].map(octave => `${pc}${octave}`)),
          []
        );
        notes.forEach(note => {
          const playNote = () => {
            violins.triggerAttack(note, '+1');
          };
          const timeout = setTimeout(() => {
            const interval = setInterval(() => {
              playNote();
            }, Math.random() * 120000 + 60000);
            intervalsToClear.push(interval);
          }, 30000);
          timeoutsToClear.push(timeout);
        });
      },
      volume: -35,
    }
  ).chain(violinReverb, reverb);

  const nodesToDispose = [
    noise,
    eq,
    lfo,
    delay1,
    delay2,
    reverb,
    stereoWidener,
    widenerLfo,
    violinReverb,
    violins,
  ];

  const pianoSamples = samples[`vsco2-piano-mf-${sampleFormat}`];
  return Promise.all(
    Reflect.ownKeys(pianoSamples).map(
      note =>
        new Promise(resolve => {
          const buffer = new Tone.Buffer(pianoSamples[note], () =>
            resolve(buffer)
          );
          nodesToDispose.push(buffer);
        })
    )
  )
    .then(buffers =>
      new Tone.Sampler(
        Reflect.ownKeys(pianoSamples).reduce((reverseConfig, note, i) => {
          reverseConfig[note] = buffers[i];
          reverseConfig[note].reverse = true;
          return reverseConfig;
        }, {})
      ).chain(reverb)
    )
    .then(reversePiano => {
      nodesToDispose.push(reversePiano);
      const notes = Chord.notes('C', 'maj7').reduce(
        (allNotes, pc) =>
          allNotes.concat([3, 4, 5].map(octave => `${pc}${octave}`)),
        []
      );
      const intervals = notes.map(() => Math.random() * 30000 + 30000);
      const minInterval = Math.min(...intervals);
      notes.forEach((note, i) => {
        const intervalTime = intervals[i];
        const playNote = () => {
          reversePiano.triggerAttack(note, '+1');
        };
        const timeout = setTimeout(() => {
          playNote();
          const interval = setInterval(() => playNote(), intervalTime);
          intervalsToClear.push(interval);
        }, intervalTime - minInterval);
        timeoutsToClear.push(timeout);
      });
    })
    .then(() => () => {
      nodesToDispose.forEach(node => node.dispose());
      timeoutsToClear.forEach(timeout => clearTimeout(timeout));
      intervalsToClear.forEach(interval => clearInterval(interval));
    });
};

export default makePiece;
