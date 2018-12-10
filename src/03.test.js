const fabric = require("./03");

const claims = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

const claim = "#1 @ 1,3: 4x3";

test("parses start positions", () => {
  expect(fabric.parseStartPositions(claim)).toEqual([1, 3]);
});

test("parses rectangle sizes", () => {
  expect(fabric.parseRectangleSize(claim)).toEqual([4, 3]);
});

// test("gets taken positions", () => {
//   expect(fabric.getPositions([3, 2], [3, 2])).toEqual([
//     [3, 2],
//     [4, 2],
//     [5, 2],
//     [3, 3],
//     [4, 3],
//     [5, 3]
//   ]);
// });

// return rectangle: [x1, y1, x2, y2]
test("gets start and end positions", () => {
  expect(fabric.getPositions([3, 2], [5, 4])).toEqual([3, 2, 8, 6]);
});

test("gets events", () => {
  expect(fabric.getEvents([[3, 2, 8, 6], [3, 2, 8, 6]])).toEqual([
    [2, 0, 3, 8],
    [6, 1, 3, 8],
    [2, 0, 3, 8],
    [6, 1, 3, 8]
  ]);
});

test("sort events", () => {
  expect(
    fabric.sortEvents([[2, 0, 3, 8], [6, 1, 3, 8], [2, 0, 3, 8], [6, 1, 3, 8]])
  ).toEqual([[2, 0, 3, 8], [2, 0, 3, 8], [6, 1, 3, 8], [6, 1, 3, 8]]);
});

// test("get active each y", () => {
//   expect(
//     fabric.getActive([[2, 0, 3, 8], [2, 0, 3, 8], [6, 1, 3, 8], [6, 1, 3, 8]])
//   ).toEqual([[[2, 0, 3, 8], [2, 0, 3, 3]], [[6, 1, 3, 8], [6, 1, 3, 8]]]);
// });

test("get active each y", () => {
  expect(
    fabric.getActive(
      fabric.getEvents([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]])
    )
  ).toEqual();
});

// test("calculates number of duplicate positions", () => {
//   expect(fabric.getDuplicateSize(claims)).toBe(4);
// });
