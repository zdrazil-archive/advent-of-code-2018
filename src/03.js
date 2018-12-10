const R = require("ramda");

// return rectangle: [x1, y1, x2, y2]
exports.getPositions = function getPositions(start, size) {
  return [start[0], start[1], start[0] + size[0], start[1] + size[1]];
};

const OPEN = 0;
const CLOSE = 1;

exports.getEvents = function getEvents(rectangles) {
  const events = rectangles.reduce(
    (acc, [x1, y1, x2, y2]) => [
      ...acc,
      [y1, OPEN, x1, x2],
      [y2, CLOSE, x1, x2]
    ],
    []
  );
  return events;
};

exports.sortEvents = e => e.sort();

exports.getActive = function getActive(events) {
  const e = this.sortEvents(events);
  const a = e.reduce((acc, curr) => {
    console.log(acc);
    const [y, type, x1, x2] = curr;
    if (type === OPEN) {
      if (acc.length === 0) {
        return [[curr]];
      }
      if (R.last(acc)[0] === curr[0]) {
        return [R.dropLast(1, acc), [...R.last(acc), curr]];
      }
      return [...acc, curr];
    }
    const matchIndex = R.findIndex(b => b[3] === curr[3] && b[4] === curr[4])(
      R.last(acc)
    );
    // console.log(matchIndex);
    // console.log(curr);
    console.log(R.last(acc));
    const newYRow = R.remove(matchIndex, matchIndex, R.last(acc));
    return acc;
    return [...R.dropLast(1, acc), newYRow];
  }, []);
  console.log(a);
  return a;
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
