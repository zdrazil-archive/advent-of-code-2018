const R = require("ramda");

exports.getPositions = function getPositions(startPosition, size) {
  const left = startPosition[0];
  const top = startPosition[1];
  const emptyRowArray = new Array(size[0]).fill(null);
  const emptyColArray = new Array(size[1]).fill(null);
  // console.log(emptyRowArray);
  const columnPositions = emptyColArray
    .map((item, index) => {
      // console.log(item);
      const cde = emptyRowArray.map((innerItem, innerIndex) => {
        const b = startPosition[0] + innerIndex;
        const c = startPosition[1] + index;
        // console.log([b, c]);
        // console.log(index);
        return [b, c];
      }); // console.log(cde);
      return cde;
    })
    .reduce((acc, item) => [...acc, ...item], []);

  // console.log(columnPositions);
  return columnPositions;
};

exports.parseStartPositions = function parseStartPositions(claim) {
  return claim
    .split(" ")[2]
    .replace(":", "")
    .split(",")
    .map(a => parseInt(a, 10));
};
exports.parseRectangleSize = function parseRectangleSize(claim) {
  return claim
    .split(" ")[3]
    .split("x")
    .map(a => parseInt(a, 10));
};

exports.getDuplicateSize = function getDuplicateSize(claims) {
  const a = claims
    .map(item => {
      const position = this.parseStartPositions(item);
      const size = this.parseRectangleSize(item);
      const b = this.getPositions(position, size);
      // console.log(b);
      return b;
    })
    .reduce((acc, curr) => [...acc, ...curr], []);
  const b = R.uniq(a);
  const c = a.length - b.length;
  return c;
};

exports.parseClaims = function parseClaims(claims) {
  return claims;
};

exports.getMultipleClaims = function getMultipleClaims(claims) {
  return claims;
};
