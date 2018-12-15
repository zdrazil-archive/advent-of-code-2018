const fabric = require("./03");

const claims = ["#1 @ 1,3: 4x3", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];
const largeClaims = ["#1 @ 10,3: 4x3", "#2 @ 300,1: 4x4", "#3 @ 50,5: 2x2"];

const claim = "#1 @ 1,3: 4x3";

test("parses start positions", () => {
  expect(fabric.parseStartPositions(claim)).toEqual([1, 3]);
});

test("parses rectangle sizes", () => {
  expect(fabric.parseRectangleSize(claim)).toEqual([4, 3]);
});

test("parses id", () => {
  expect(fabric.parseId(claim)).toEqual("#1");
});

test("gets rectangles", () => {
  expect(fabric.getRectangles(claims)).toEqual([
    [1, 3, 5, 6, "#1"],
    [3, 1, 7, 5, "#2"],
    [5, 5, 7, 7, "#3"]
  ]);
});

test("gets events", () => {
  expect(fabric.getEvents(fabric.getRectangles(claims))).toEqual([
    [3, 0, 1, 5, "#1"],
    [6, 1, 1, 5, "#1"],
    [1, 0, 3, 7, "#2"],
    [5, 1, 3, 7, "#2"],
    [5, 0, 5, 7, "#3"],
    [7, 1, 5, 7, "#3"]
  ]);
});

test("sorts events", () => {
  expect(
    fabric.sortEvents(fabric.getEvents(fabric.getRectangles(largeClaims)))
  ).toEqual([
    [1, 0, 300, 304, "#2"],
    [3, 0, 10, 14, "#1"],
    [5, 0, 50, 52, "#3"],
    [5, 1, 300, 304, "#2"],
    [6, 1, 10, 14, "#1"],
    [7, 1, 50, 52, "#3"]
  ]);
});

test("gets nr. of multiple claims", () => {
  expect(fabric.getMultipleClaims(claims).ans).toEqual(4);
});

test("gets id of claim that doesn't overlap", () => {
  const nonoverlappingClaim = [
    "#1 @ 1,3: 4x4",
    "#2 @ 3,1: 4x4",
    "#3 @ 5,5: 2x2"
  ];
  expect(fabric.getMultipleClaims(nonoverlappingClaim).uniqueRect).toEqual(
    "#3"
  );
});
