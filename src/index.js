const lib = require("./lib");
const frequency = require("./01");
const inventory = require("./02");
const fabric = require("./03");
const polymer = require("./05");

console.log(`Calibrated frequency: ${frequency.calibrate(lib.getInput("01"))}`);

console.log(`Duplicate: ${frequency.findDuplicate(lib.getInput("01"))}`);

console.log(`Checksum: ${inventory.getChecksum(lib.getInput("02"))}`);

console.log(
  `Common letters: ${inventory.getCommonLetters(lib.getInput("02"))}`
);

console.log(
  `Polymer after reaction: ${polymer.react(lib.getInput("05")[0]).length}`
);

console.log(
  `Nr. of duplicate fabric: ${fabric.getDuplicateSize(lib.getInput("03"))}`
);

console.log(`Unique fabric: ${fabric.getUniqueClaim(lib.getInput("03"))}`);

console.time("findShortest");
console.log(
  `Shortest polymer's length: ${
    polymer.findShortest(lib.getInput("05")[0]).length
  }`
);
console.timeEnd("findShortest");
