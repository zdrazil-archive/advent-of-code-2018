const fabric = require("./03");

const claims = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

const claim = "#1 @ 1,3: 4x3";

test("parses start positions", () => {
  expect(fabric.parseStartPositions(claim)).toEqual([1, 3]);
});

test("parses rectangle sizes", () => {
  expect(fabric.parseRectangleSize(claim)).toEqual([4, 3]);
});

test("gets taken positions", () => {
  expect(fabric.getPositions([3, 2], [3, 2])).toEqual([
    [3, 2],
    [4, 2],
    [5, 2],
    [3, 3],
    [4, 3],
    [5, 3]
  ]);
});

test("calculates number of duplicate positions", () => {
  expect(fabric.getDuplicateSize(claims)).toBe(4);
});
