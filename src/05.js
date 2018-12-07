const R = require("ramda");

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

function removeUtil(string, lastChar) {
  if (string.length === 0 || string.length === 1) {
    return string;
  }

  if (isSameCase(string[0], string[1])) {
    return removeUtil(R.tail(R.tail(string)));
  }
  return [string[0], ...removeUtil(R.tail(string))];
}

exports.remove = function remove(string) {
  let newString = removeUtil(toList(string));
  while (newString !== "" && containsSameCase(newString)) {
    newString = removeUtil(newString);
  }

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
