const lib = require("./lib");
const frequency = require("./01");
const inventory = require("./02");

console.log(frequency.calibrate(lib.getInput("01")));

console.log(frequency.findDuplicate(lib.getInput("01")));

console.log(inventory.getChecksum(lib.getInput("02")));
console.log(inventory.getDifferingCharacters(lib.getInput("02")));
