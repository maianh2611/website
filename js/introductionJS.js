"use strict"
/** Teaches IE < 9 to recognize HTML5 elements. */
function createDummyElements() {
  var semanticElements = [
    "article", "aside", "details", "figcaption", "figure",
    "footer", "header", "hgroup", "menu", "nav", "section"
  ];
  for (var i = 0; i < semanticElements.length; i++) {
    document.createElement(semanticElements[i]);
  }
}
/* Execute createDummyElements() only in the old IE versions. */
function checkIEVersion(){
  if (document.addEventListener === undefined){
    createDummyElements();
  }
}
checkIEVersion();
