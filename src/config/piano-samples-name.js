const OGG_SAMPLES = 'vsco2-piano-mf-ogg';
const MP3_SAMPLES = 'vsco2-piano-mf-mp3';

const audio = document.createElement('audio');

const pianoSamplesName =
  audio.canPlayType('audio/ogg') !== '' ? OGG_SAMPLES : MP3_SAMPLES;

export default pianoSamplesName;
