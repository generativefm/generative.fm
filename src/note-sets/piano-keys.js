import combineNotesWithOctaves from '../util/combine-notes-with-octaves';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaves = [1, 2, 3, 4, 5, 6, 7];

const allNotes = [
  'A0',
  'A#0',
  'B0',
  ...combineNotesWithOctaves(notes, octaves),
  'C8',
];

export default allNotes;
