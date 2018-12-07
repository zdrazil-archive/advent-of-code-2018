const fs = require("fs");
const path = require("path");

exports.getInput = function(day) {
  return fs
    .readFileSync(path.resolve(__dirname, `./data/input-${day}.txt`), "utf8")
    .split("\n")
    .slice(0, -1);
};

exports.trampoline = fn => (...args) => {
  let result = fn(...args);
  while (typeof result === "function") {
    result = result();
  }

  return result;
};
