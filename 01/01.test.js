const frequency = require("./01");

test("calibrates frequencies +1, -2, +3, +1 to 3", () => {
  expect(frequency.calibrate([+1, -2, +3, +1])).toBe(3);
});

const testCases = [
  [[+1, -2, +3, +1], 2],
  [[+1, -1], 0],
  [[+3, +3, +4, -2, -4], 10],
  [[-6, +3, +8, +5, -6], 5],
  [[+7, +7, -2, -7, -4], 14]
];

describe.each(testCases)(
  ".finds duplicate fruequency from (%i)",
  (a, expected) => {
    test(`returns ${expected}`, () => {
      expect(frequency.findDuplicate(a)).toBe(expected);
    });
  }
);
