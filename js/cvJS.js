"use strict"
var t = {
  "description": {
    "1":["Key Facts", ["fact3", "fact4"]],
    "2":["Some Details", ["fact2", "fact3", "fact4"]],
    "3":["All Details", ["fact1", "fact2", "fact3", "fact4", "fact5"]]
  }
};
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

/* Create slider*/
function createInput(){
  if (U.supportsInput("range")) {
    var rangeInput = document.createElement("input");
    var label = document.createElement("label");
    label.setAttribute("id", "output");
    rangeInput.setAttribute("type", "range");
    rangeInput.setAttribute("max", 3);
    rangeInput.setAttribute("min", 1);
    rangeInput.setAttribute("step", 1);
    rangeInput.setAttribute("value", 1);
    t.showLevel = U.$("showInform");
    t.showLevel.appendChild(label);
    t.showLevel.appendChild(rangeInput);
  } else {
    throw new TypeError(errorMsg("The browser does not support this input", arguments));
  }
}
/* Execute createDummyElements() only in the old IE versions. */
function checkIEVersion(){
  if (document.addEventListener === undefined){
    createDummyElements();
  }
}

/**
 * @param {element} el
 * Remove element from the document.
 *
*/
function Clean(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

checkIEVersion();
U.ready(function(){
  createInput();
  t.output = U.$("output");
  U.setText(t.output, "Key Facts: ");
  t.sec2 = U.$("sec2")
  t.slider = t.showLevel.getElementsByTagName("input")[0];
  t.divArray = t.sec2.getElementsByTagName("div");
  var keyFacts = {
    introduce: U.$("sec1"),
    fact1: t.divArray[0],
    fact2: t.divArray[1],
    fact3: t.divArray[2],
    fact4: t.divArray[3],
    fact5: t.divArray[4]
  };
  // Update the information in cv when the slider changes
  function updateDescription() {
    Clean(t.sec2);
    var val = t.showLevel.getElementsByTagName("input")[0].value;
    U.setText(t.output, t.description[val][0] + ": ");
    t.description[val][1].forEach(function(k){
      t.sec2.appendChild(keyFacts[k]);
    });
  }
  updateDescription();

  U.addHandler(t.slider, "change", updateDescription);
})

//local helpers
function errorMsg (prefix, args) {
  //convert arts to an Array
  args = Array.prototype.slice.call(args);
  return prefix + ": " + args.join(",");
}
