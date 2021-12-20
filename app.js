/*
 * Exercise 1: URL Parser
 * By Bruno Amadori
 * For Rotunda Software
 */

/*
 * DECLARING MAIN FUNCTIONS
 *
 */

function getHash(urlInstance) {
  const hash = {};

  // First I split the urlInstance and then I extract the data into the hash object.

  const urlInstanceArray = urlInstance.split("/");

  hash.version = parseInt(urlInstanceArray[1]);
  hash.collection = urlInstanceArray[3];
  hash.id = parseInt(urlInstanceArray[4].split("?")[0]);

  const params = new URLSearchParams(urlInstanceArray[4].split("?")[1]);

  hash.sort = params.get("sort");
  hash.limit = parseInt(params.get("limit"));

  return hash;
}

function hashToString(hash) {
  return JSON.stringify(hash, null, 2) // I stringify the object
    .replace(/"([^"]+)":/g, "$1:"); // Some regex to delete "double quotes" on properties
}

/*
 *  Manipulating DOM
 *
 */

const outputDiv = document.getElementById("output");

// Getting form elements
const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");
const urlError = document.getElementById("urlError");

// Adding listener for form submission
urlForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  try {
    let hash = getHash(urlInput.value);
    let hashString = hashToString(hash);
    outputDiv.innerHTML = hashString;
    console.log(hash);
  } catch (err) {
    urlError.innerHTML =
      "An error has occured. Please try again with an URL that respects the mentioned structure.";
    console.log(err);
  }
});
