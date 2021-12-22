import getHashTable from "./lib/getHashTable";
import hashTableToString from "./lib/hashTableToString";

/**
 * This function inits the form and provides main functionality on frontend
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
      console.log(hashString);
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
