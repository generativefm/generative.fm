const mapToObj = map =>
  Array.from(map).reduce((o, [key, value]) => {
    o[key] = value;
    return o;
  }, {});

export default mapToObj;
