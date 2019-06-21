const releaseDate = {
  label: 'release date',
  defaultDirectionLabel: 'newest',
  reverseDirectionLabel: 'oldest',
  fn: pieces => pieces.slice(0).sort((a, b) => b.releaseDate - a.releaseDate),
};

export default releaseDate;
