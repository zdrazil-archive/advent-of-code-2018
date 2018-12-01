const frequency = require("./01");

test("calibrates frequencies", () => {
  expect(frequency.calibrate([+1, -2, +3, +1])).toBe(3);
});
