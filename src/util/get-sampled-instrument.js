import Tone from 'tone';
import getSamples from './get-samples';

const getSampledInstrument = (instrumentName, options) =>
  getSamples().then(
    samples =>
      new Promise(resolve => {
        const instrument = new Tone.Sampler(
          samples[instrumentName],
          Object.assign({}, options, {
            onload: () => resolve(instrument),
          })
        );
      })
  );

export default getSampledInstrument;
