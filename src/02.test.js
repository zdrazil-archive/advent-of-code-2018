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

test("gets item frequencies", () => {
  expect(inventory.getFrequency("bababc")).toEqual({ a: 2, b: 3, c: 1 });
});

test("gets boxes checksum", () => {
  expect(inventory.getChecksum(boxIds)).toBe(12);
});

const differentBoxIds = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz"
];

// test("returns differing characters", () => {
//   expect(inventory.getDifferingCharacters(differentBoxIds)).toBe(["h", "u"]);
// });

// test("returns boxes that differ by one character", () => {
//   expect(inventory.getRightBoxes(differentBoxIds)).toBe(["fghij", "fguij"]);
// });

test("gets common letters", () => {
  expect(inventory.getCommonLetters(differentBoxIds)).toBe("fgij");
});
