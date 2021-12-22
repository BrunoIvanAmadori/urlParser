/**
 * This function is a regex validator to recognize only-numbers data
 * @param {*} data
 * @returns {boolean} Number validation result
 */

function isNumber(data) {
  let output;
  if (/^\d+$/.test(data)) {
    output = true;
  } else {
    output = false;
  }
  return output;
}

export default isNumber;
