/**
 * This functions parses urlFormat and creates an array that delivers
 * the information I need to parse urlInstance
 * @param {string} url
 * @returns {array} Array with variable names as values. Non-variables are null.
 */

function getUrlFormatArray(url) {
  const outputFormat = [];

  const urlFormatArray = url.slice(1).split("/");

  for (let i = 0; i < urlFormatArray.length; i++) {
    // I test if the name starts with ":" to recognize if it's a variable part
    if (/^:/.test(urlFormatArray[i])) {
      // if yes, delete ":" and assign the name of the variable to the outputFormat in its respective index
      outputFormat[i] = urlFormatArray[i].slice(1);
    }
  }

  return outputFormat;
}

export default getUrlFormatArray;
