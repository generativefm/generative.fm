const combineNotesWithOctaves = (notes, octaves) =>
  octaves.reduce(
    (collection, octave) =>
      collection.concat(notes.map(note => `${note}${octave}`)),
    []
  );

export default combineNotesWithOctaves;
