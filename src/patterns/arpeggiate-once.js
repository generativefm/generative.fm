import getRandomBetween from '../util/get-random-between';

const arpeggiateOnce = (instrument, notes, withinTime) => {
  notes.forEach(note => {
    const time = getRandomBetween(0, withinTime);
    instrument.triggerAttack(note, `+${time}`);
  });
};

export default arpeggiateOnce;
