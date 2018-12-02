const lib = require("./lib");
const frequency = require("./01");

console.log(frequency.calibrate(lib.getInput("01")));

console.log(frequency.findDuplicate(lib.getInput("01")));
