import sampleFormat from '../config/sample-format';
import prependEndpointToSampleFilename from './prepend-endpoint-to-sample-filename';

const DEFAULT_ENDPOINT = 'https://samples.generative.fm.s3.amazonaws.com';
const VERSION = '0.0.3';

const specFile = `${DEFAULT_ENDPOINT}/index.${VERSION}.json`;

const samplePromise = fetch(specFile)
  .then(response => response.json())
  .then(spec =>
    Reflect.ownKeys(spec.samples).reduce(
      (specWithEndpoints, instrumentName) => {
        const instrumentSamples = spec.samples[instrumentName][sampleFormat];
        specWithEndpoints[instrumentName] = Reflect.ownKeys(
          instrumentSamples
        ).reduce((samplesWithEndpoint, note) => {
          samplesWithEndpoint[note] = prependEndpointToSampleFilename(
            instrumentName,
            sampleFormat,
            instrumentSamples[note]
          );
          return samplesWithEndpoint;
        }, {});
        return specWithEndpoints;
      },
      {}
    )
  );

const getSamples = () => samplePromise;

export default getSamples;
