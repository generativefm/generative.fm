import Tone from 'tone';
import samples from '../../samples/samples';

const getSampledInstrument = instrumentName =>
  new Promise(resolve => {
    const instrument = new Tone.Sampler(samples[instrumentName], {
      onload: () => resolve(instrument),
      attack: 0,
    });
  });

export default getSampledInstrument;
