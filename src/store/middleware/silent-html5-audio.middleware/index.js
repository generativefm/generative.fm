import PLAY from '../../actions/types/play.type';
import STOP from '../../actions/types/stop.type';
import silentAudioFile from './silence.mp3';

// Plays a silent audio file from an HTML5 audio element when music is playing.
// This is required to get both iOS devices and the media session API to behave.
const silentHtml5AudioMiddleware = (/*store*/) => next => {
  const audio = document.createElement('audio');
  audio.src = silentAudioFile;
  audio.loop = true;
  return action => {
    if (action.type === PLAY) {
      audio.play();
    } else if (action.type === STOP) {
      audio.pause();
    }
    return next(action);
  };
};

export default silentHtml5AudioMiddleware;
