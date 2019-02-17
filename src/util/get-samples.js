import fetchSampleSpec from '@generative-music/samples.generative.fm/dist/browser';
import sampleFormat from '../config/sample-format';

const samplePromise = fetchSampleSpec().then(spec =>
  Reflect.ownKeys(spec.samples).reduce((formatSpec, instrumentName) => {
    formatSpec[instrumentName] = spec.samples[instrumentName][sampleFormat];
    return formatSpec;
  }, {})
);

const getSamples = () => samplePromise;

export default getSamples;
