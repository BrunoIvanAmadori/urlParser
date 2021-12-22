(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _getHashTable = require("./lib/getHashTable");

var _getHashTable2 = _interopRequireDefault(_getHashTable);

var _hashTableToString = require("./lib/hashTableToString");

var _hashTableToString2 = _interopRequireDefault(_hashTableToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function inits the form and provides main functionality on frontend
 */
function initForm() {
  var outputDiv = document.getElementById("output"); // Getting form elements

  var urlForm = document.getElementById("url-form");
  var urlInstanceInput = document.getElementById("url-instance-input");
  var urlFormatInput = document.getElementById("url-format-input");
  var urlError = document.getElementById("url-error"); // Adding listener for form submission

  urlForm.addEventListener("submit", function (ev) {
    ev.preventDefault(); // We implement a simple try...catch, but there would be nice to implement further validation.

    try {
      var hashTable = (0, _getHashTable2.default)(urlInstanceInput.value, urlFormatInput.value);
      var hashString = (0, _hashTableToString2.default)(hashTable);
      console.log(hashString);
      outputDiv.innerHTML = hashString;
      urlError.innerHTML = "";
    } catch (err) {
      urlError.innerHTML = "An error has occured. Please try again with an URL that respects the mentioned structure.";
      console.log(err);
    }
  });
} // We execute the stuff.


initForm();

},{"./lib/getHashTable":2,"./lib/hashTableToString":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUrlFormatArray = require("./getUrlFormatArray");

var _getUrlFormatArray2 = _interopRequireDefault(_getUrlFormatArray);

var _isNumber = require("./isNumber");

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the main function, given a urlInstance and a urlFormatString I get a hashTable
 * @param {string} urlInstanceString The url to be parsed
 * @param {string} urlFormatString The format we'll use to parse the url
 * @returns
 */
function getHashTable(urlInstanceString, urlFormatString) {
  var hashTable = {}; // First I remove the first "/" character because it messes up the index.
  // then I split the urlInstance.

  var urlInstanceArray = urlInstanceString.slice(1).split("/"); // I remove the querystring from the last value so I can use IsNumber check.

  urlInstanceArray[urlInstanceArray.length - 1] = urlInstanceArray[urlInstanceArray.length - 1].split("?")[0]; // It's better to have the urlFormatString as an array because I can associate
  // the name of the variable part and the index

  var format = (0, _getUrlFormatArray2.default)(urlFormatString);
  console.log(format);

  for (var i = 0; i < format.length; i++) {
    // If the index corresponds to a non-variable part, we skip it because we don't need it in the hashTable
    if (format[i] == undefined) {
      continue;
    } else {
      hashTable[format[i]] = urlInstanceArray[i];
    } // If the value is a Number, then parseInt that


    if ((0, _isNumber2.default)(urlInstanceArray[i])) {
      hashTable[format[i]] = parseInt(urlInstanceArray[i]);
    }
  } // Getting the params


  var params = new URLSearchParams(urlInstanceString.split("?")[1]);
  params.forEach(function (param, index) {
    if ((0, _isNumber2.default)(param)) {
      hashTable[index] = parseInt(param);
    } else {
      hashTable[index] = param;
    }
  });
  return hashTable;
}

exports.default = getHashTable;

},{"./getUrlFormatArray":3,"./isNumber":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * This functions parses urlFormat and creates an array that delivers
 * the information I need to parse urlInstance
 * @param {string} url
 * @returns {array} Array with variable names as values. Non-variables are null.
 */
function getUrlFormatArray(url) {
  var outputFormat = [];
  var urlFormatArray = url.slice(1).split("/");

  for (var i = 0; i < urlFormatArray.length; i++) {
    // I test if the name starts with ":" to recognize if it's a variable part
    if (/^:/.test(urlFormatArray[i])) {
      // if yes, delete ":" and assign the name of the variable to the outputFormat in its respective index
      outputFormat[i] = urlFormatArray[i].slice(1);
    }
  }

  return outputFormat;
}

exports.default = getUrlFormatArray;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *
 * @param {object} hashTable
 * @returns {string} hashTable object transformed into string.
 */
function hashTableToString(hashTable) {
  return JSON.stringify(hashTable, null, 2) // I stringify the object
  .replace(/"([^"]+)":/g, "$1:"); // Some regex to delete "double quotes" on properties
}

exports.default = hashTableToString;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * This function is a regex validator to recognize only-numbers data
 * @param {*} data
 * @returns {boolean} Number validation result
 */
function isNumber(data) {
  var output = void 0;

  if (/^\d+$/.test(data)) {
    output = true;
  } else {
    output = false;
  }

  return output;
}

exports.default = isNumber;

},{}]},{},[1]);
