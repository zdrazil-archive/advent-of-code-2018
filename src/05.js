const R = require("ramda");
const { trampoline } = require("./lib");

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function isSameCase(char1, char2) {
  if (char1 !== char2 && char1.toLowerCase() === char2.toLowerCase()) {
    return true;
  }
  return false;
}

function removeReactions(string, sumString = []) {
  if (string.length === 0) {
    return sumString;
  }
  if (sumString.length >= 1 && isSameCase(R.last(sumString), R.head(string))) {
    return () => removeReactions(R.tail(string), R.dropLast(1, sumString));
  }

  if (string.length === 2 && isSameCase(string[0], string[1])) {
    return () => removeReactions(R.tail(R.tail(string)), sumString);
  }

  return () => removeReactions(R.tail(string), [...sumString, string[0]]);
}

exports.findShortest = function findShortest(string) {
  const afterReactions = this.react(string);
  const alphaResults = ALPHABET.map(alphaChar => {
    const regex = new RegExp(alphaChar, "gi");
    const filteredPolymer = afterReactions.replace(regex, "");
    return trampoline(removeReactions)(filteredPolymer).join("");
  });
  return R.reduce(
    R.minBy(a => (a.length ? a.length : a)),
    Infinity,
    alphaResults
  );
};

exports.react = function react(string) {
  return trampoline(removeReactions)(string.split("")).join("");
};
