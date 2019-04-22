const sampleSource =
  location.hostname !== 'generative.fm' &&
  location.hostname !== 'staging.generative.fm'
    ? {
        baseUrl: './',
      }
    : {};

export default sampleSource;
