async function getDefinitions() {
  const getting = await browser.storage.local.get("definitionsUrl");
  const result = await getting;
  const defsUrl = await result.definitionsUrl;
  const response = await fetch(defsUrl, {
    'method': 'GET',
    'mode': 'cors'
  })
  return await response.json();
}


function dejargon(root, definition) {
  let word = definition.name;
  textNodesUnder(root).forEach(wrapTerms);

  function textNodesUnder(root) {
    let walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false), text=[], node;
    while (node = walk.nextNode()) {
      text.push(node);
    }
    
    return text;
  }
    
  function wrapTerms(n) {
    for (var i; (i = n.nodeValue.indexOf(word,i)) > -1; n = after) {
      var after = n.splitText(i + word.length);
      let highlighted = n.splitText(i);
      
      let innerSpan = document.createElement('span');
      innerSpan.className = "dejargon-popuptext";
      const description = definition.description;
      const innerSpanText = document.createTextNode(description);
      innerSpan.appendChild(innerSpanText);
      
      let outerSpan = document.createElement('span');
      outerSpan.className = "dejargon-define";
      outerSpan.appendChild(highlighted);
      outerSpan.appendChild(innerSpan);
      
      outerSpan.addEventListener("mouseover", function() {
        innerSpan.classList.toggle("dejargon-popup-show");
      });
     
      after.parentNode.insertBefore(outerSpan, after);
    }
  }
}

(function() {
  if (window.hasDejargon) {
    return;
  }

  window.hasDejargon = true;

  getDefinitions()
    .then(function(data) {
      for (let i = 0; i < data.length; i++) {
        dejargon(document.body, data[i]);
      }
      
      console.log("Finishing loading dejargon");
    })
    .catch(e => console.error(e))
})();

