const fs = require("fs");
const path = require("path");

exports.getInput = function(day) {
  return fs
    .readFileSync(path.resolve(__dirname, `./data/input-${day}.txt`), "utf8")
    .split("\n")
    .slice(0, -1);
};
