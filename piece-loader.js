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
      pieceManifest.isRecordable},
    tags: [${['dark', 'focus', 'electronic', 'melancholy', 'ambient', 'piano']
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.ceil(Math.random() * 6))
      .map(tag => `'${tag}'`)
      .join(', ')}]
  }`;

  return output;
};

module.exports = pieceLoader;
