import Tone from 'tone';
import getSampledInstrument from '../util/get-sampled-instrument';
import getRandomBetween from '../util/get-random-between';
import log from '../util/log';
import roundToTwo from '../util/round-to-two';

const randomizedArpeggiator = (
  notes,
  instrumentName,
  intervalMinSeconds,
  intervalMaxSeconds,
  shouldPlay = () => true
) =>
  getSampledInstrument(instrumentName).then(instrument => {
    notes.forEach(note => {
      const interval = getRandomBetween(intervalMinSeconds, intervalMaxSeconds);
      const delay = getRandomBetween(
        0,
        intervalMaxSeconds - intervalMinSeconds
      );
      log(
        `scheduling ${note.toLowerCase()} every ${roundToTwo(
          interval
        )} seconds starting in ${roundToTwo(delay)} seconds`
      );
      Tone.Transport.scheduleRepeat(
        () => {
          if (shouldPlay()) {
            Tone.Draw.schedule(() => {
              log(`playing ${note.toLowerCase()}`);
            }, '+1.6');
            instrument.triggerAttack(note, '+1');
          }
        },
        interval,
        delay
      );
    });
    return instrument;
  });

export default randomizedArpeggiator;
