import Tone from 'tone';
import getSamples from './get-samples';

const getSampledInstrument = instrumentName =>
  getSamples().then(
    samples =>
      new Promise(resolve => {
        const instrument = new Tone.Sampler(samples[instrumentName], {
          onload: () => resolve(instrument),
          attack: 0,
        });
      })
  );

export default getSampledInstrument;
