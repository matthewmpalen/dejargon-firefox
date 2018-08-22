function saveOptions(e) {
    e.preventDefault();
    const defsUrl = document.querySelector("#definitionsUrl").value;

    fetch(defsUrl, {
        'method': 'GET',
        'mode': 'cors'
    }).then(function (response) {
        browser.storage.local.set({
            definitionsUrl: defsUrl,
            dejargonDefinitions: response.json()
        })
    }).catch(e => console.error(e))
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
