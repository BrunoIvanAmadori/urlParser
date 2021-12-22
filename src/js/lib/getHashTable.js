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
  // Then I split the urlInstance so I can parse separately each part.
  const urlInstanceSplitted = urlInstanceString.slice(1).split("?");

  // Naming each part
  const urlInstanceWithNoQuery = urlInstanceSplitted[0];
  const queryOfUrlInstance = urlInstanceSplitted[1];

  // Function for parsing UrlInstance

  function parseUrlInstance(url, formatArray) {
    // I create en array splitting
    const urlInstanceArray = url.split("/");

    // It's better to have the urlFormatString as an array too so I can associate both
    const format = formatArray;

    for (let i = 0; i < format.length; i++) {
      // If the index corresponds to a non-variable part, we skip it because we don't need it in the hashTable
      if (format[i] == undefined) {
        continue;
      }

      hashTable[format[i]] = urlInstanceArray[i];

      // If the value is a Number, then parseInt that
      if (isNumber(urlInstanceArray[i])) {
        hashTable[format[i]] = parseInt(urlInstanceArray[i]);
      }
    }
  }

  // Function for parsing the params
  function parseParams(queryString) {
    const params = new URLSearchParams(queryString);

    params.forEach((param, index) => {
      if (isNumber(param)) {
        hashTable[index] = parseInt(param);
      } else {
        hashTable[index] = param;
      }
    });
  }

  // I get the url format array and then pass it to parseUrlInstance

  const urlFormatArray = getUrlFormatArray(urlFormatString);
  parseUrlInstance(urlInstanceWithNoQuery, urlFormatArray);

  // Finally I parse params
  parseParams(queryOfUrlInstance);

  return hashTable;
}

export default getHashTable;
