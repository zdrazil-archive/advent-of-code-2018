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

const query = actives => {
  if (actives.length === 0) {
    return 0;
  }
  const e = actives
    .reduce((acc, [x1, x2]) => [...acc, [x1, OPEN, x1], [x2, CLOSE, x1]], [])
    .sort();
  const a = e.reduce(
    (acc, curr) => {
      const [x, type, id] = curr;
      const { prevActive, ans, curX } = acc;
      console.log(acc);
      const newAns = ans + (prevActive.length >= 1 ? 1 : 0) * (x - curX);
      let newActive = [];
      if (type === OPEN) {
        newActive = [...prevActive, id];
      } else {
        const matchIndex = R.findIndex(R.equals(id))(prevActive);
        newActive =
          matchIndex === -1 ? prevActive : R.remove(matchIndex, 1, prevActive);
      }
      return {
        prevActive: newActive,
        ans: newAns,
        curX: x
      };
    },
    {
      prevActive: [],
      ans: 0,
      curX: e[0][0]
    }
  );

  return a.ans;
};

exports.getActive = function getActive(events) {
  const e = this.sortEvents(events);
  console.log(e);
  // const eRows = groupWith((a, b) => a[0] === b[0], e);
  const b = e.reduce(
    (acc, curr) => {
      const [y, type, x1, x2] = curr;
      const { prevActive, ans, curY } = acc;
      const newAns = ans + query(prevActive) * (y - curY);
      let newActive = [];
      if (type === OPEN) {
        newActive = [...prevActive, [x1, x2]].sort();
      } else {
        const matchIndex = R.findIndex(R.equals([x1, x2]))(prevActive);
        // console.log(prevActive);
        // console.log([x1, x2]);
        // console.log(matchIndex);
        // console.log(matchIndex);
        newActive =
          matchIndex === -1 ? prevActive : R.remove(matchIndex, 1, prevActive);
        // console.log(newActive);
        // console.log("---");
      }
      // console.log(newActive);
      return {
        prevActive: newActive,
        ans: newAns,
        curY: y
      };
    },
    {
      prevActive: [],
      ans: 0,
      curY: e[0][0]
    }
  );
  // console.log(b.ans);
  return b.ans;
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
  const rectangles = claims.map(item => {
    const startPosition = this.parseStartPositions(item);
    const size = this.parseRectangleSize(item);
    return this.getPositions(startPosition, size);
  });
  const events = this.getEvents(rectangles);
  const c = this.getActive(events);
  return c;
};

exports.parseClaims = function parseClaims(claims) {
  return claims;
};

exports.getMultipleClaims = function getMultipleClaims(claims) {
  return claims;
};
