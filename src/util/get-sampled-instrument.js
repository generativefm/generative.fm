import Tone from 'tone';
import samples from '../../samples/samples';
import sampleFormat from '../config/sample-format';

const getSampledInstrument = instrumentName =>
  new Promise(resolve => {
    const instrument = new Tone.Sampler(
      samples[`${instrumentName}-${sampleFormat}`],
      {
        onload: () => resolve(instrument),
        attack: 0,
      }
    );
  });

export default getSampledInstrument;
