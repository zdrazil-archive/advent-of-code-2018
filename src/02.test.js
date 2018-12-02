const inventory = require("./02.js");

const boxIds = [
  "abcdef",
  "bababc",
  "abbcde",
  "abcccd",
  "aabcdd",
  "abcdee",
  "ababab"
];

test("get item frequencies", () => {
  expect(inventory.getFrequency("bababc")).toEqual({ a: 2, b: 3, c: 1 });
});

test("get boxes checksum", () => {
  expect(inventory.getChecksum(boxIds)).toBe(12);
});
