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
  let ans = 0;
  let cur = -1;
  actives.forEach(([x1, x2]) => {
    cur = R.max(cur, x1);
    ans += R.max(0, x2 - cur);
    cur = R.max(cur, x2);
  });
  return ans;
};

exports.getActive = function getActive(events) {
  const e = this.sortEvents(events);
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
        console.log(newActive);
        console.log("---");
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
