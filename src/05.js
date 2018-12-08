const R = require("ramda");
const { trampoline } = require("./lib");

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

exports.react = function remove(string) {
  return trampoline(removeReactions)(string.split("")).join("");
};
