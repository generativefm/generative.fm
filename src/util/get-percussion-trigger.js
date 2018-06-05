import getSampledInstrument from './get-sampled-instrument';
import samples from '../../samples/samples';

const getPercussionTrigger = instrumentName =>
  getSampledInstrument(instrumentName).then(instrument => {
    const possibleNotes = Object.keys(samples[instrumentName]);
    instrument.possibleNotes = possibleNotes;
    return instrument;
  });

export default getPercussionTrigger;
