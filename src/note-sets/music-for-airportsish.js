import combineNotesWithOctaves from '../util/combine-notes-with-octaves';

const notes = ['A', 'G#', 'C', 'C#', 'D#', 'F'];
const octaves = [3, 4, 5];

const allNotes = combineNotesWithOctaves(notes, octaves);

export default allNotes;
