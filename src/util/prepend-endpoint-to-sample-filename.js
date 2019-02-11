const ENDPOINT = 'https://samples.generative.fm';

const prependEndpointToSampleFilename = (instrumentName, format, filename) =>
  `${ENDPOINT}/${instrumentName}/${format}/${filename}`;

// Using CJS while this is needed by both browser and node
// eslint-disable-next-line
module.exports = prependEndpointToSampleFilename;
