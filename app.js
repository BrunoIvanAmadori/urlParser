/*
 * Ejercicio 1: URL Parser
 * Por Bruno Amadori
 * Para Rotunda Software
 */

/*
 * DECLARO FUNCIONES
 *
 */

function getHash(urlInstance) {
  const hash = {};

  // Primero separo el urlInstance y luego empiezo a extraer los datos.

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
  return JSON.stringify(hash, null, 2) // paso a string con dos espacios
    .replace(/"([^"]+)":/g, "$1:"); // hago regex para quitar "double quotes" en propiedades
}

/*
 *  OUTPUT
 *
 */

const outputDiv = document.getElementById("output");

// Funcionalidad del form
const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");
const urlError = document.getElementById("urlError");

urlForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  try {
    let hash = getHash(urlInput.value);
    let hashString = hashToString(hash);
    outputDiv.innerHTML = hashString;
    console.log(hash);
  } catch (err) {
    urlError.innerHTML =
      "An error has occured. Please enter the url respecting the mentioned structure.";
    console.log(err);
  }
});
