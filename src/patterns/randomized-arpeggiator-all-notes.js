import randomizedArpeggiator from './randomized-arpeggiator';
import samples from '../samples';

const randomizedArpeggiatorAllNotes = (instrumentName, ...args) => {
  const notes = Object.keys(samples[instrumentName]);
  return randomizedArpeggiator(notes, instrumentName, ...args);
};

export default randomizedArpeggiatorAllNotes;
