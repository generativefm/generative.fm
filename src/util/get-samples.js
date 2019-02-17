import sampleFormat from '../config/sample-format';
import fetchSampleSpec from './sample-client/fetch-sample-spec';

const samplePromise = fetchSampleSpec(window.fetch).then(spec =>
  Reflect.ownKeys(spec.samples).reduce((formatSpec, instrumentName) => {
    formatSpec[instrumentName] = spec.samples[instrumentName][sampleFormat];
    return formatSpec;
  }, {})
);

const getSamples = () => samplePromise;

export default getSamples;
