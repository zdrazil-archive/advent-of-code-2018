const polymer = require("./05.js");

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

test("finds shortest polymer", () => {
  expect(polymer.findShortest("dabAcCaCBAcCcaDA")).toBe("daDA");
});
