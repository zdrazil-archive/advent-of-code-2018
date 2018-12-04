const lib = require("./lib");
const frequency = require("./01");
const inventory = require("./02");

console.log(`Calibrated frequency: ${frequency.calibrate(lib.getInput("01"))}`);

console.log(`Duplicate: ${frequency.findDuplicate(lib.getInput("01"))}`);

console.log(`Checksum: ${inventory.getChecksum(lib.getInput("02"))}`);

console.log(
  `Common letters: ${inventory.getCommonLetters(lib.getInput("02"))}`
);
