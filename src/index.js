const lib = require("./lib");
const frequency = require("./01");
const inventory = require("./02");

console.log(frequency.calibrate(lib.getInput("01")));

console.log(frequency.findDuplicate(lib.getInput("01")));

console.log(inventory.getChecksum(lib.getInput("02")));
const differentBoxIds = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz"
];
// console.log(inventory.getCommonLetters(differentBoxIds));
console.log(inventory.getCommonLetters(lib.getInput("02")));
