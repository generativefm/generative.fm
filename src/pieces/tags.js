import pieces from './';

const tagSet = new Set(
  pieces
    .map(({ tags }) => tags)
    .reduce((allTags, tags) => allTags.concat(tags), [])
);

const tags = Array.from(tagSet).sort();

export default tags;
