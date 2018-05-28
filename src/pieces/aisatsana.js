import Tone from 'tone';
import Chain from 'markov-chains';
import getSampledInstrument from '../util/get-sampled-instrument';
import instructions from '../../aisatsana.json';

const BPM = 102;
const EIGTH_NOTE_INTERVAL = 60 / (2 * BPM);
const DELIMITER = ',';

Tone.Transport.bpm.value = BPM;

const notes = instructions.tracks[1].notes.slice(0);
const eigthNotes = [];

for (let time = 0; time <= 301; time += EIGTH_NOTE_INTERVAL) {
  const names = notes
    .filter(note => time <= note.time && note.time < time + EIGTH_NOTE_INTERVAL)
    .map(({ name }) => name)
    .sort();
  eigthNotes.push(names.join(DELIMITER));
}

const phrases = [];
const phraseLength = 4 * 2 * 4;
const enCopy = eigthNotes.slice(0);
while (enCopy.length > 0) {
  phrases.push(enCopy.splice(0, phraseLength));
}

const phrasesWithIndex = phrases.map(phrase =>
  phrase.map(
    (names, i) => (names.length === 0 ? `${i}` : `${i}${DELIMITER}${names}`)
  )
);

const chain = new Chain(phrasesWithIndex);
const piece = (master, log) => {
  log('aisatsana (generative mix)');
  return getSampledInstrument('sso-piano').then(piano => {
    log('ready');
    piano.connect(master);
    const schedule = () => {
      Tone.Draw.schedule(() => log('generating new phrase'));
      const phrase = chain.walk();
      Tone.Draw.schedule(() => log('phrase generated'));
      phrase.forEach(str => {
        const [time, ...names] = str.split(DELIMITER);
        names.forEach(name =>
          Tone.Transport.scheduleOnce(
            piano.triggerAttack.bind(piano, name),
            `+${time * EIGTH_NOTE_INTERVAL}`
          )
        );
        if (names.length > 0) {
          Tone.Draw.schedule(
            () =>
              log(
                `playing ${names.map(name => name.toLowerCase()).join(', ')}`
              ),
            `+${time * EIGTH_NOTE_INTERVAL}`
          );
        }
      });
    };
    Tone.Transport.scheduleRepeat(
      schedule,
      phraseLength * EIGTH_NOTE_INTERVAL,
      '+0.1'
    );
  });
};

export default piece;
