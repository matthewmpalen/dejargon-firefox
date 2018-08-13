function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    definitionsUrl: document.querySelector("#definitionsUrl").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#definitionsUrl").value = result.definitionsUrl || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("definitionsUrl");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
