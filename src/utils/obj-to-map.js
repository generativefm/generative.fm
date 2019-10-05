const objToMap = o =>
  Reflect.ownKeys(o).reduce((map, key) => {
    map.set(key, o[key]);
    return map;
  }, new Map());

export default objToMap;
