const fs = require("fs");
const path = require("path");

exports.calibrate = function(frequencies) {
  return frequencies.reduce((acc, val) => acc + Number(val), 0);
};

exports.getFrequencies = function() {
  return fs
    .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
    .split("\n");
};
