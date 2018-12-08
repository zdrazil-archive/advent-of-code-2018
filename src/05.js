const R = require("ramda");
const { trampoline } = require("./lib");

function isSameCase(char1, char2) {
  if (char1 !== char2 && char1.toLowerCase() === char2.toLowerCase()) {
    return true;
  }
  return false;
}

function containsSameCase(string) {
  const result = string.reduce((prev, current) => {
    if (prev === true) {
      return true;
    }
    if (prev === "") {
      return current;
    }
    if (isSameCase(prev, current)) {
      return true;
    }
    return current;
  }, "");

  return result === true;
}

function removeUtil(string, sumString = []) {
  // console.log(string);
  if (string.length === 0) {
    return sumString;
  }
  if (sumString.length >= 1 && isSameCase(R.last(sumString), R.head(string))) {
    return () => removeUtil(R.tail(string), R.dropLast(1, sumString));
  }

  if (string.length === 2 && isSameCase(string[0], string[1])) {
    return () => removeUtil(R.tail(R.tail(string)), sumString);
  }
  return () => removeUtil(R.tail(string), [...sumString, string[0]]);
}

exports.remove = function remove(string) {
  console.time("someFunction");
  const newString = trampoline(removeUtil)(toList(string));

  console.timeEnd("someFunction");
  return toString(newString);
};

function toList(string) {
  return string.split("");
}

function toString(x) {
  return x.join("");
}

exports.reactPair = function reactPair(pairs) {
  const abc = "";
};

exports.react = function react(polymer) {
  const abc = "";
  return this.remove(polymer);
};
