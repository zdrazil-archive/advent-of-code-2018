const R = require("ramda");

exports.getFrequency = function(str) {
  return str.split("").reduce((prev, curr) => {
    const newValue = prev[curr] ? prev[curr] + 1 : 1;
    return { ...prev, [curr]: newValue };
  }, {});
};

exports.getChecksum = function(boxIds) {
  const frequencies = boxIds.map(item => {
    const itemFrequencies = R.values(this.getFrequency(item));
    return [itemFrequencies.includes(2), itemFrequencies.includes(3)];
  });
  const temp = frequencies.reduce(
    (prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]],
    [0, 0]
  );
  return temp[0] * temp[1];
};
