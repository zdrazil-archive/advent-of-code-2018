const R = require("ramda");

function isSameCase(char1, char2) {
  if (char1 !== char2 && char1.toLowerCase() === char2.toLowerCase()) {
    return true;
  }
  return false;
}

function removeUtil(string, lastRemoved) {
  if (string.length === 0 || string.length === 1) {
    return string;
  }

  // Remove leftmost pairs  and recur for remaining
  // string
  if (isSameCase(string[0], string[1])) {
    string = R.tail(R.tail(string));
    return removeUtil(string, string[0]);
  }

  // At this point, the first character is definitely different
  // from its adjacent. Ignore first character and recursively
  // remove characters from remaining string
  const remStr = removeUtil(R.tail(string), lastRemoved);

  // Check if the first character of the rem_string matches
  // with the first character of the original string
  if (remStr.length !== 0 && isSameCase(remStr[0], string[0])) {
    lastRemoved = string[0];
    return R.tail(remStr);
  }

  // If remaining string becomes empty and last removed character
  // is same as first character of original string. This is needed
  // for a string like "acbbcddc"
  if (remStr.length === 0 && lastRemoved === string[0]) {
    return remStr;
  }

  // If the two first characters of str and rem_str don't match,
  // append first character of str before the first character of
  // rem_str.
  return [string[0]] + remStr;
}

function removeUtil2(string, lastRemoved) {
  if (string.length === 0 || string.length === 1) {
    return string;
  }

  // Remove leftmost same characters and recur for remaining
  // string
  if (string[0] === string[1]) {
    lastRemoved = string[0];
    while (string.length > 1 && string[0] === string[1]) {
      string = R.tail(string);
    }
    string = R.tail(string);
    return removeUtil(string, lastRemoved);
  }

  // At this point, the first character is definiotely different
  // from its adjacent. Ignore first character and recursively
  // remove characters from remaining string
  const remStr = removeUtil(R.tail(string), lastRemoved);

  // Check if the first character of the rem_string matches
  // with the first character of the original string
  if (remStr.length !== 0 && remStr[0] === string[0]) {
    lastRemoved = string[0];
    return R.tail(remStr);
  }

  // If remaining string becomes empty and last removed character
  // is same as first character of original string. This is needed
  // for a string like "acbbcddc"
  if (remStr.length === 0 && lastRemoved === string[0]) {
    return remStr;
  }

  // If the two first characters of str and rem_str don't match,
  // append first character of str before the first character of
  // rem_str.
  return [string[0]] + remStr;
}

exports.remove = function remove(string) {
  const lastRemoved = 0;
  return toString(removeUtil(toList(string), lastRemoved));
};

function toList(string) {
  return string.split("");
}

function toString(x) {
  return x.toString();
}

exports.reactPair = function reactPair(pairs) {
  const abc = "";
};

exports.react = function react(polymer) {
  const abc = "";
  return this.remove(polymer);
};
