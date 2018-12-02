exports.calibrate = function(frequencies) {
  return frequencies.reduce((acc, val) => acc + Number(val), 0);
};

exports.findDuplicate = function(frequencies) {
  const set = new Set([0]);
  let acc = 0;
  let duplicate = null;

  while (duplicate == null) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of frequencies) {
      const sum = acc + Number(item);
      if (set.has(sum)) {
        duplicate = sum;
        break;
      } else {
        acc = sum;
      }
      set.add(sum);
    }
  }
  return duplicate;
};
