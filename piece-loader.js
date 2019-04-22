'use strict';

const pieceLoader = source => {
  const pieceManifest = JSON.parse(source);
  const output = `import image from '${pieceManifest.image}';
  import makePiece from '${pieceManifest.makePiece}';
  export default {
    image,
    makePiece,
    title: '${pieceManifest.title}',
    id: '${pieceManifest.artistId}-${pieceManifest.id}',
    artist: '${pieceManifest.artistId}',
    isRecordable: ${typeof pieceManifest.isRecordable !== 'boolean' ||
      pieceManifest.isRecordable}
  }`;

  return output;
};

module.exports = pieceLoader;
