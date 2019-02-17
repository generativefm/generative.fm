import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';
import getSamples from '../util/get-samples';

const FLUTE_NOTES = ['C3', 'C4', 'G3', 'G4'];

const makePiece = master =>
  getSamples()
    .then(samples =>
      Promise.all([
        getSampledInstrument('vsco2-flute-susvib'),
        ...samples['acoustic-guitar-chords-cmaj'].map(
          url =>
            new Promise(resolve => {
              const buffer = new Tone.Buffer(url, () => resolve(buffer));
            })
        ),
      ])
    )
    .then(([flute, ...guitarBuffers]) => {
      const timeoutsToClear = [];
      const intervalsToClear = [];
      const volume = new Tone.Volume(-10);

      const volumeLfo = new Tone.LFO({
        frequency: Math.random() / 100,
        min: -30,
        max: -10,
      });
      volumeLfo.connect(flute.volume);
      volumeLfo.start();
      const fluteReverb = new Tone.Reverb(50);
      fluteReverb.wet.value = 1;
      const delay = new Tone.FeedbackDelay({ delayTime: 1, feedback: 0.7 });
      fluteReverb.generate().then(() => {
        flute.chain(fluteReverb, delay, volume, master);

        const intervalTimes = FLUTE_NOTES.map(
          () => Math.random() * 10000 + 5000
        );

        const shortestInterval = Math.min(...intervalTimes);

        FLUTE_NOTES.forEach((note, i) => {
          const playNote = () => {
            flute.triggerAttack(note, '+1');
          };
          timeoutsToClear.push(
            setTimeout(() => {
              playNote();
              intervalsToClear.push(
                setInterval(() => {
                  playNote();
                }, intervalTimes[i])
              );
            }, intervalTimes[i] - shortestInterval)
          );
        });
      });

      const reverb = new Tone.Freeverb({
        roomSize: 0.5,
        dampening: 5000,
        wet: 0.2,
      });
      const compressor = new Tone.Compressor();
      reverb.chain(compressor, volume, master);

      const playRandomChord = lastChord => {
        const nextChords = guitarBuffers.filter(chord => chord !== lastChord);
        const randomChord =
          nextChords[Math.floor(Math.random() * nextChords.length)];
        const source = new Tone.BufferSource(randomChord).connect(reverb);
        source.onended = () => {
          source.dispose();
        };
        source.start('+1');
        timeoutsToClear.push(
          setTimeout(() => {
            playRandomChord(randomChord);
          }, Math.random() * 10000 + 10000)
        );
      };
      timeoutsToClear.push(
        setTimeout(() => {
          playRandomChord();
        }, Math.random() * 5000 + 5000)
      );

      return () => {
        timeoutsToClear.forEach(timeout => clearTimeout(timeout));
        intervalsToClear.forEach(interval => clearInterval(interval));
        [
          flute,
          ...guitarBuffers,
          volumeLfo,
          fluteReverb,
          reverb,
          compressor,
        ].forEach(node => node.dispose());
      };
    });

export default makePiece;
