const R = require("ramda");

const OPEN = 0;
const CLOSE = 1;

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

function getPositions(start, size, id = 0) {
  return [start[0], start[1], start[0] + size[0], start[1] + size[1], id];
}

exports.getRectangles = function getRectangles(claims) {
  return claims.map(item => {
    const startPosition = this.parseStartPositions(item);
    const size = this.parseRectangleSize(item);
    const id = this.parseId(item);
    return getPositions(startPosition, size, id);
  });
};

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

function compFunc(a, b) {
  const len = a.length > b.length ? b.length : a.length;

  for (let i = 0; i < len; i += 1) {
    if (a[i] - b[i] !== 0) return a[i] - b[i];
  }

  return 0;
}

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
      const isOverlapping = prevActive.length >= 2;
      const newAns = ans + (isOverlapping ? 1 : 0) * (x - curX);

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
        newActive =
          matchIndex === -1 ? prevActive : R.remove(matchIndex, 1, prevActive);
      }
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
  return b;
};

exports.getMultipleClaims = function getDuplicateSize(claims) {
  const rectangles = this.getRectangles(claims);
  const events = this.getEvents(rectangles);
  const claimIds = claims.map(item => this.parseId(item));
  return this.getActive(events, claimIds);
};
