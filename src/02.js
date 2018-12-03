const R = require("ramda");

exports.getFrequency = function getFrequency(str) {
  return str.split("").reduce((prev, curr) => {
    const newValue = prev[curr] ? prev[curr] + 1 : 1;
    return { ...prev, [curr]: newValue };
  }, {});
};

exports.getChecksum = function getChecksum(boxIds) {
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

exports.getDifferingCharacters = function getDifferingCharacters(boxIds) {
  const result = boxIds.map((item, index) =>
    boxIds.map((innerItem, innerIndex) => {
      if (innerIndex === index) {
        return [];
      }
      return R.symmetricDifference(item, innerItem);
    })
  );
  console.log(result);
  const result2 = result.map(item =>
    item.reduce((accum, innerItem, index) => {
      if (innerItem.length === 2) {
        return [...accum, index];
      }
      return accum;
    }, [])
  );
  console.log(result2);

  const result3 = R.uniq(
    result2
      .map((item, index) => {
        // console.log(item.length);
        const abc = "sdf";
        if (boxIds[index] === undefined || boxIds[item] === undefined) {
          return null;
        }
        return R.pair(boxIds[index], boxIds[item]);
      })
      .filter(item => item !== null)
      .map(item => item.sort())
  );
  console.log(result3);
  // return result3;
  const result4 = result3
    .map(item => R.intersection(item[0], item[1]))
    .map(innerItem => innerItem.join(""));

  console.log(result4);
  return result4;
};
