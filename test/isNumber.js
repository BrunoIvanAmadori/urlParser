function isNumber(data) {
  let output;
  if (/^\d+$/.test(data)) {
    output = true;
  } else {
    output = false;
  }
  return output;
}

module.exports = { isNumber };
