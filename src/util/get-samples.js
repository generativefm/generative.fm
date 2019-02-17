import sampleFormat from '../config/sample-format';
import prependEndpointToSampleFilename from './prepend-endpoint-to-sample-filename';

const DEFAULT_ENDPOINT = 'https://samples.generative.fm';
const VERSION = '0.2.0';

const specFile = `${DEFAULT_ENDPOINT}/index.${VERSION}.json`;

const samplePromise = fetch(specFile)
  .then(response => response.json())
  .then(spec =>
    Reflect.ownKeys(spec.samples).reduce(
      (specWithEndpoints, instrumentName) => {
        const instrumentSamples = spec.samples[instrumentName][sampleFormat];
        if (Array.isArray(instrumentSamples)) {
          specWithEndpoints[instrumentName] = instrumentSamples.map(filename =>
            prependEndpointToSampleFilename(
              instrumentName,
              sampleFormat,
              filename
            )
          );
        } else {
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
        }

        return specWithEndpoints;
      },
      {}
    )
  );

const getSamples = () => samplePromise;

export default getSamples;
