import aisatsana from '@generative-music/piece-aisatsana';
import enoMachine from '@generative-music/piece-eno-machine';
import sevenths from '@generative-music/piece-sevenths';
import pinwheels from '@generative-music/piece-pinwheels';
import makeMakeSinglePianoPiece from '../util/make-make-single-piano-piece';
import lemniscate from './lemniscate';
import impact from './impact';
import littleBells from './little-bells';
import meditation from './meditation';
import timbralOscillations from './timbral-oscillations';
import otherness from './otherness';
import trees from './trees';
import aViableSystem from './a-viable-system';
import apoapsis from './apoapsis';
import observableStreams from './observable-streams';
import townsend from './townsend';
import enoMachineImage from './images/eno-machine.png';
import pinwheelsImage from './images/pinwheels.png';
import seventhsImage from './images/sevenths.png';
import lemniscateImage from './images/lemniscate.png';
import aisatsanaImage from './images/aisatsana.png';
import impactImage from './images/impact.png';
import littleBellsImage from './images/little-bells.png';
import meditationImage from './images/meditation.png';
import timbralOscillationsImage from './images/timbral-oscillations.png';
import othernessImage from './images/otherness.png';
import treesImage from './images/trees.png';
import aViableSystemImage from './images/a-viable-system.png';
import apoapsisImage from './images/apoapsis.png';
import observableStreamsImage from './images/observable-streams.png';
import townsendImage from './images/townsend.png';

const ARTIST_ID = 'alex-bainter';

const piece = (title, makePiece, id, image) => ({
  title,
  makePiece,
  image,
  id: `${ARTIST_ID}-${id}`,
  artist: ARTIST_ID,
});

const pieces = [
  piece(
    'Eno Machine',
    makeMakeSinglePianoPiece(enoMachine),
    'eno-machine',
    enoMachineImage
  ),
  piece('Lemniscate', lemniscate, 'lemniscate', lemniscateImage),
  piece(
    'aisatsana (generative remix)',
    makeMakeSinglePianoPiece(aisatsana),
    'aisatsana',
    aisatsanaImage
  ),
  piece(
    'Sevenths',
    makeMakeSinglePianoPiece(sevenths),
    'sevenths',
    seventhsImage
  ),
  piece('Impact', impact, 'impact', impactImage),
  piece(
    'Pinwheels',
    makeMakeSinglePianoPiece(pinwheels),
    'pinwheels',
    pinwheelsImage
  ),
  piece('Little Bells', littleBells, 'little-bells', littleBellsImage),
  piece('Meditation', meditation, 'meditation', meditationImage),
  piece(
    'Timbral Oscillations',
    timbralOscillations,
    'timbral-oscillations',
    timbralOscillationsImage
  ),
  piece('Otherness', otherness, 'otherness', othernessImage),
  piece('Trees', trees, 'trees', treesImage),
  piece(
    'A Viable System',
    aViableSystem,
    'a-viable-system',
    aViableSystemImage
  ),
  piece('Apoapsis', apoapsis, 'apoapsis', apoapsisImage),
  piece(
    'Observable Streams',
    observableStreams,
    'observable-streams',
    observableStreamsImage
  ),
  piece('Townsend', townsend, 'townsend', townsendImage),
].reverse();

export default pieces;
