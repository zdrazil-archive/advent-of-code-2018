const polymer = require("./05.js");

// test("pair reacts", () => {
//   expect(polymer.reactPair("aA")).toEqual("");
// });

// test("pair doesn't react", () => {
//   expect(polymer.reactPair("AA")).toEqual("AA");
// });

const testCases = [
  ["abBA", ""],
  ["aabAAB", "aabAAB"],
  ["abAB", "abAB"],
  ["dabAcCaCBAcCcaDA", "dabCBAcaDA"]
];

describe.each(testCases)(".react pairs (%s)", (a, expected) => {
  test(`returns ${expected}`, () => {
    expect(polymer.react(a)).toBe(expected);
  });
});
