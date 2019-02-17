'use strict';

const ENDPOINT = 'https://samples.generative.fm';
const VERSION = '1.0.0';

const pathWithEndpoint = path => `${ENDPOINT}/${path}`;
const specFile = pathWithEndpoint(`index.${VERSION}.json`);

const fetchSampleSpec = fetch =>
  fetch(specFile)
    .then(response => response.json())
    .then(spec => {
      const { samples } = spec;
      Reflect.ownKeys(samples).forEach(instrumentName => {
        const instrumentSamplesByFormat = samples[instrumentName];
        Reflect.ownKeys(samples[instrumentName]).forEach(format => {
          const instrumentSamples = instrumentSamplesByFormat[format];
          if (Array.isArray(instrumentSamples)) {
            instrumentSamplesByFormat[format] = instrumentSamples.map(path =>
              pathWithEndpoint(path)
            );
          } else {
            instrumentSamplesByFormat[format] = Reflect.ownKeys(
              instrumentSamples
            ).reduce((samplesWithEndpoint, note) => {
              samplesWithEndpoint[note] = pathWithEndpoint(
                instrumentSamples[note]
              );
              return samplesWithEndpoint;
            }, {});
          }
        });
      });
      return spec;
    });

module.exports = fetchSampleSpec;
