const releaseDate = {
  label: 'release date',
  defaultDirectionLabel: 'newest first',
  reverseDirectionLabel: 'oldest first',
  fn: pieces => pieces.slice(0).sort((a, b) => b.releaseDate - a.releaseDate),
};

export default releaseDate;
