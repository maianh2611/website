"use strict"
var g = {
  "imgFiles": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg",
    "7.jpg", "8.jpg"],
  "currentIndex":1,
};
/**
 * This function creates and caches images before the DOM is loaded
 */
function preloadImg(){
  var newImgArray = new Array();
  if (document.addEventListener === undefined){
    for(var i = 0; i < g.imgFiles.length; i++){
      var element = new Image();
      element.alt = g.imgFiles[i].split(".")[0];
      element.src = "image/DD/" + g.imgFiles[i];
      element.setAttribute("id", "img" + element.alt);
      element.ondragstart = function() { return false; };

      newImgArray[i] = element;
    }
  }
  else{
    newImgArray = g.imgFiles.map(function(filename) {
      var element = new Image();
      element.alt = filename.split(".")[0];
      element.src = "image/DD/" + filename;
      element.setAttribute("id", "img" + element.alt);
      element.draggable=false;
      return element;
    });
  }
  return newImgArray;
}

g.imgElements = preloadImg();
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
/**
  *Grab image, change images's border color, z-index when images clicks
  */
function grab(evt, img){
  g.xdiff = img.offsetLeft - evt.clientX;
  g.ydiff = img.offsetTop - evt.clientY;
  g.img = img;
  g.currentIndex++;
  img.style.zIndex = g.currentIndex;
  img.style.border  =  "6px solid #70bdde";
  U.addHandler(g.container, "mousemove", movePic);
  U.addHandler(g.container, "mouseup", drop);
  U.addHandler(g.container, "mouseleave", drop);
}
/**
 * @param {number} newPosition
 * Update image's location
 *
*/
function movePicUpdate(newPosition) {
  g.img.style.left = g.xdiff + newPosition.x + "px";
  g.img.style.top = g.ydiff + newPosition.y + "px";
}
/**
  * Allow moving images when it is clicked
*/
function movePic(e) {
  var evt = e || window.event;
  var newPosition = {
    x: evt.clientX,
    y: evt.clientY
  }
  setTimeout(function() { movePicUpdate(newPosition); }, 20)
}
/**
  * Place image in container
*/
function drop(e) {
  g.img.style.border  =  "6px solid #33373b";
  U.removeHandler(g.container, "mousemove", movePic);
  U.removeHandler(g.container, "mouseup", drop);
  U.removeHandler(g.container, "mouseleave", drop);
}
checkIEVersion();
/**
  * Create images in document, adding handler and flip them when they are double clicked.
*/
U.ready(function() {
  g.container = U.$("container");
  var picR = new Image();
  picR.src = "image/DD/9.jpg";
  for(var i = 0; i < g.imgElements.length; i++) {
    (function() {
      var img = g.imgElements[i];
      g.container.appendChild(img);
      var temp = g.imgElements[i].src;
      U.addHandler(img, "mousedown", function(e) {
        var evt = e || window.event;
        if (evt.preventDefault) {
          evt.preventDefault();
        }
        grab(evt, img)
      });
      U.addHandler(img, "dblclick", function(e){
        if(img.src !==  picR.src){
          img.src = picR.src;
        } else {
          img.src = temp;
        }
      });
    })();
  }
});
