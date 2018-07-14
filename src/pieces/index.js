import aisatsana from './aisatsana';
import enoMachine from './eno-machine';
import lemniscate from './lemniscate';
// import drums from './drums';
// import harp from './harp';
// import test from './test';

const piece = (title, makePiece, link = title, description = '') => ({
  title,
  makePiece,
  description,
  link,
});

const pieces = [
  // piece('test', test),
  // piece('harp', harp),
  // piece('drums', drums),
  piece(
    'aisatsana [102] (Generative Remix)',
    aisatsana,
    'aisatsana',
    `"aisatsana [102]" is the closing track from Aphex Twin's 2014 album <i>Syro</i>.
This generative remix is created by splitting the original piece into 4 bar phrases.
Each phrase is quantized such that every note in the phrase is triggered during one of the 32 eighth notes contained in each phrase.
These phrases are then input into a Markov chain, which can be used to generate new phrases based on the probababilities of the notes which occurred in the actual piece.
While there are only 32 phrases in the original piece, this version is capabable of creating 4,147,200 unique phrases.
If each possible phrase were played in succession without repeating, it would take over 451 days to play them all.`
  ),
  piece(
    'Eno Machine',
    enoMachine,
    'eno-machine',
    `Brian Eno is credited with coining the phrase "generative music" and has used generative techniques in his compositions.
His 1978 release <i>Ambient 1: Music for Airports</i> includes a track titled "2/1," which is a recording of a generative piece.
"2/1" was created by simultaneously playing several loops of audio tape of different lengths, each containing a single note.
For example, one note was on a loop of tape which took 23 1/2 seconds to repeat, while another note was on a loop which took 25 7/8 seconds to repeat.
Other notes were on other loops of different lengths.
These loops were then played together to create the piece.
As more loops of different lengths are added, it requires more and more time for the piece to repeat itself; if the lengths chosen do not share factors, it can take an extremely long time.
Using this technique, even with relatively few loops, the time required for the piece to repeat itself can quickly grow to more than the average lifetime.
The piece played here uses a similar technique to generate unique music which will not repeat itself for a very long time.
Each of the 18 notes in the piece (which are the same ones from "2/1" on multiple octaves) are played on a random interval between 20 and 60 seconds.
New intervals are chosen each time the piece is generated.`
  ),
  piece('Lemniscate', lemniscate, 'lemniscate'),
];

export default pieces;
