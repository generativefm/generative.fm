import getRandomBetween from '../util/get-random-between';

const arpeggiateOnce = ({ instrument, notes, withinTime, velocity = 1 }) => {
  notes.forEach(note => {
    const time = getRandomBetween(0, withinTime);
    instrument.triggerAttack(note, `+${time}`, velocity);
  });
};

export default arpeggiateOnce;
