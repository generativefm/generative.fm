const notes = ['A', 'G#', 'C', 'C#', 'D#', 'F'];
const octaves = [3, 4, 5];

const allNotes = notes.reduce(
  (collection, note) =>
    collection.concat(octaves.map(octave => `${note}${octave}`)),
  []
);

export default allNotes;
