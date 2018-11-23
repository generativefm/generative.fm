const OGG_FORMAT = 'ogg';
const MP3_FORMAT = 'mp3';

const audio = document.createElement('audio');

const sampleFormat =
  audio.canPlayType('audio/ogg') !== '' ? OGG_FORMAT : MP3_FORMAT;

export default sampleFormat;
