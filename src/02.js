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

const getDifferingCharacters = (a, b) => {
  const result = a.split("").map((item, index) => {
    if (b[index] !== item) {
      return null;
    }
    return item;
  });
  return result.filter(item => item !== null).join("");
};

exports.getCommonLetters = function getCommonLetters(boxIds) {
  const result = boxIds.map((item, index) => {
    const results = boxIds.map((innerItem, innerIndex) => {
      if (innerIndex === index) {
        return [];
      }
      const diffWord = getDifferingCharacters(item, innerItem);
      if (diffWord.length === boxIds[0].length - 1) {
        return diffWord;
      }
      return [];
    });
    return results;
  });
  const result2 = R.flatten(result);
  const result3 = result2[0].split("").map((item, index) => {
    if (result2[1][index] !== item) {
      return null;
    }
    return item;
  });
  const result4 = result3.filter(item => item !== null);
  // console.log(result4.join(""));
  return result4.join("");
  // const result2 = R.unnest(result).map(item =>
  //   item.filter(item => item !== null)
  // );
  // const result3 = result2.filter(item => {
  //   const abc = "";
  //   // console.log(item.length);
  //   return item.length === boxIds[0].length - 1;
  // });
  // const result4 = R.flatten(R.uniq(result3)).join("");
  return result2;
};
