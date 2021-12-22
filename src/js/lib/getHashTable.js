import getUrlFormatArray from "./getUrlFormatArray";
import isNumber from "./isNumber";

/**
 * This is the main function, given a urlInstance and a urlFormatString I get a hashTable
 * @param {string} urlInstanceString The url to be parsed
 * @param {string} urlFormatString The format we'll use to parse the url
 * @returns
 */

function getHashTable(urlInstanceString, urlFormatString) {
  const hashTable = {};

  // First I remove the first "/" character because it messes up the index.
  // then I split the urlInstance.
  const urlInstanceArray = urlInstanceString.slice(1).split("/");

  // I remove the querystring from the last value so I can use IsNumber check.
  urlInstanceArray[urlInstanceArray.length - 1] =
    urlInstanceArray[urlInstanceArray.length - 1].split("?")[0];

  // It's better to have the urlFormatString as an array because I can associate
  // the name of the variable part and the index
  const format = getUrlFormatArray(urlFormatString);
  console.log(format);

  for (let i = 0; i < format.length; i++) {
    // If the index corresponds to a non-variable part, we skip it because we don't need it in the hashTable
    if (format[i] == undefined) {
      continue;
    } else {
      hashTable[format[i]] = urlInstanceArray[i];
    }

    // If the value is a Number, then parseInt that
    if (isNumber(urlInstanceArray[i])) {
      hashTable[format[i]] = parseInt(urlInstanceArray[i]);
    }
  }

  // Getting the params
  const params = new URLSearchParams(urlInstanceString.split("?")[1]);

  params.forEach((param, index) => {
    if (isNumber(param)) {
      hashTable[index] = parseInt(param);
    } else {
      hashTable[index] = param;
    }
  });

  return hashTable;
}

export default getHashTable;
