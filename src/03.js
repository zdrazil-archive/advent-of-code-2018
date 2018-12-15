const R = require("ramda");

// return rectangle: [x1, y1, x2, y2]
exports.getPositions = function getPositions(start, size, id = 0) {
  return [start[0], start[1], start[0] + size[0], start[1] + size[1], id];
};

const OPEN = 0;
const CLOSE = 1;

exports.getEvents = function getEvents(rectangles) {
  const events = rectangles.reduce(
    (acc, [x1, y1, x2, y2, id]) => [
      ...acc,
      [y1, OPEN, x1, x2, id],
      [y2, CLOSE, x1, x2, id]
    ],
    []
  );
  return events;
};

const compFunc = function(a, b) {
  const len = a.length > b.length ? b.length : a.length;

  for (let i = 0; i < len; i += 1) {
    if (a[i] - b[i] !== 0) return a[i] - b[i];
  }

  return 0;
};

exports.sortEvents = function sortEvents(e) {
  return e.sort(compFunc);
};

const query = (actives, uniqueRect) => {
  if (actives.length === 0) {
    return {
      ans: 0,
      uniqueRect
    };
  }
  const e = this.sortEvents(
    actives.reduce(
      (acc, [x1, x2, id]) => [...acc, [x1, OPEN, id], [x2, CLOSE, id]],
      []
    )
  );

  const a = e.reduce(
    (acc, curr) => {
      const [x, type, id] = curr;
      const { prevActive, ans, curX, uniqueRect } = acc;
      // console.log(acc);
      const isOverlapping = prevActive.length >= 2;
      const newAns = ans + (isOverlapping ? 1 : 0) * (x - curX);
      // console.log(prevActive.slice(1, 3));
      // console.log(isOverlapping);
      if (isOverlapping) {
        // console.log(R.without(prevActive, uniqueRect).length);
      }

      // console.log(uniqueRect.slice(1, 3));
      const newUniqueRect = isOverlapping
        ? R.without(prevActive, uniqueRect)
        : uniqueRect;

      let newActive = [];
      if (type === OPEN) {
        newActive = [...prevActive, id].sort();
      } else {
        const matchIndex = R.findIndex(R.equals(id))(prevActive);
        newActive =
          matchIndex === -1 ? prevActive : R.remove(matchIndex, 1, prevActive);
      }
      return {
        prevActive: newActive,
        ans: newAns,
        curX: x,
        uniqueRect: newUniqueRect
      };
    },
    {
      prevActive: [],
      ans: 0,
      curX: e[0][0],
      uniqueRect
    }
  );
  return {
    ans: a.ans,
    uniqueRect: a.uniqueRect
  };
};

exports.getActive = function getActive(events, claimIds) {
  const e = this.sortEvents(events);
  // const eRows = groupWith((a, b) => a[0] === b[0], e);
  const b = e.reduce(
    (acc, curr) => {
      const [y, type, x1, x2, id] = curr;
      const { prevActive, ans, curY, uniqueRect } = acc;
      const queryResult = query(prevActive, uniqueRect);
      const newAns = ans + queryResult.ans * (y - curY);
      let newActive = [];
      if (type === OPEN) {
        newActive = [...prevActive, [x1, x2, id]].sort();
      } else {
        const matchIndex = R.findIndex(R.equals([x1, x2, id]))(prevActive);
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
        curY: y,
        uniqueRect: queryResult.uniqueRect
      };
    },
    {
      prevActive: [],
      ans: 0,
      curY: e[0][0],
      uniqueRect: claimIds
    }
  );
  // console.log(b.ans);
  return b;
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

exports.parseId = function parseId(claim) {
  return claim.split(" ")[0];
};

exports.getDuplicateSize = function getDuplicateSize(claims) {
  const rectangles = claims.map(item => {
    const startPosition = this.parseStartPositions(item);
    const size = this.parseRectangleSize(item);
    const id = this.parseId(item);
    return this.getPositions(startPosition, size, id);
  });
  const claimIds = claims.map(item => this.parseId(item));
  const events = this.getEvents(rectangles);
  const c = this.getActive(events, claimIds);
  return c;
};

exports.getUniqueClaim = function getUniqueCLaim(claims) {
  // const rectangles = claims.map(item => {
  //   const startPosition = this.parseStartPositions(item);
  //   const size = this.parseRectangleSize(item);
  //   const id = this.parseId(item);
  //   return this.getPositions(startPosition, size, id);
  // });
  // const events = this.sortEvents(this.getEvents(rectangles));
  // const c = events.reduce(
  //   (acc, curr) => {
  //     const { prev, unique } = acc;
  //     const newUnique = R.equals(prev[4], curr[4]) ? [...unique, curr] : unique;
  //     const newPrev = curr;
  //     return {
  //       prev: newPrev,
  //       unique: newUnique
  //     };
  //   },
  //   {
  //     prev: [],
  //     unique: []
  //   }
  // );
  // console.log(c);
  return "a";
};

exports.parseClaims = function parseClaims(claims) {
  return claims;
};

exports.getMultipleClaims = function getMultipleClaims(claims) {
  return claims;
};
