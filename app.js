/*
 * This functions parses urlFormat and creates an array that delivers
 * the information I need to parse urlInstance
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

// This function is a regex validator to recognize only-numbers data

function isNumber(data) {
  let output;
  if (/^\d+$/.test(data)) {
    output = true;
  } else {
    output = false;
  }
  return output;
}

// This is the main function, given a urlInstance and a urlFormatString I get a hashTable

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

function hashTableToString(hashTable) {
  return JSON.stringify(hashTable, null, 2) // I stringify the object
    .replace(/"([^"]+)":/g, "$1:"); // Some regex to delete "double quotes" on properties
}

/*
 *  This is just a function to initialize the form behaviour
 *
 */

function initForm() {
  const outputDiv = document.getElementById("output");

  // Getting form elements
  const urlForm = document.getElementById("url-form");
  const urlInstanceInput = document.getElementById("url-instance-input");
  const urlFormatInput = document.getElementById("url-format-input");
  const urlError = document.getElementById("url-error");

  // Adding listener for form submission
  urlForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // We implement a simple try...catch, but there would be nice to implement further validation.
    try {
      let hashTable = getHashTable(
        urlInstanceInput.value,
        urlFormatInput.value
      );
      let hashString = hashTableToString(hashTable);
      outputDiv.innerHTML = hashString;
      urlError.innerHTML = "";
    } catch (err) {
      urlError.innerHTML =
        "An error has occured. Please try again with an URL that respects the mentioned structure.";
      console.log(err);
    }
  });
}

// We execute the stuff.
initForm();
