import * as Tone from 'tone';

const streamDestination = Tone.context.createMediaStreamDestination();

export default streamDestination;
