// "inspired by" https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
import { context } from 'tone';

const startAudioContext = () => {
  console.log(context.state);
  if (context.state && context.state !== 'running') {
    // this accomplishes the iOS specific requirement
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);

    // resume the audio context
    if (context.resume) {
      context.resume();
    }

    // Unlock HTML5 Audio - load a data url of short silence and play it
    // This will allow us to play web audio when the mute toggle is on
    console.log('here we go');
    const silenceDataURL =
      'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    const tag = document.createElement('audio');
    tag.controls = false;
    tag.preload = 'auto';
    tag.loop = false;
    tag.src = silenceDataURL;
    tag.onended = () => {
      console.log('HTMLAudio unlocked!');
    };
    const p = tag.play();
    if (p) {
      p.then(
        () => {
          console.log('play success');
        },
        reason => {
          console.log('play failed', reason);
        }
      );
    }
  }
};

export default startAudioContext;
