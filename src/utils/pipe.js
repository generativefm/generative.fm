const pipe = (...fns) => x => fns.reduce((y, fn) => fn(y), x);

export default pipe;
