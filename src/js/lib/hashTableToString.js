/**
 *
 * @param {object} hashTable
 * @returns {string} hashTable object transformed into string.
 */
function hashTableToString(hashTable) {
  return JSON.stringify(hashTable, null, 2) // I stringify the object
    .replace(/"([^"]+)":/g, "$1:"); // Some regex to delete "double quotes" on properties
}

export default hashTableToString;
