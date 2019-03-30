// HTML setup
var itemsHTMLCollection = document.getElementsByClassName("parallax-item");
var itemsArray = Array.from(itemsHTMLCollection);

// Input Setup
var input = {
  mouseX: {
    start: window.innerWidth * -1,
    end: window.innerWidth,
    current: 0
  },
  mouseY: {
    start: window.innerHeight * -1,
    end: window.innerHeight,
    current: 0
  }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// Output Setup
var output = {
  x: {
    start: -600,
    end: 600,
    current: 0
  },
  y: {
    start: -600,
    end: 600,
    current: 0
  },
  zIndex: {
    range: 10000
  }
};

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

var updateInputs = function() {
  //mouse x input
  input.mouseX.current = mouse.x;
  input.mouseX.fraction =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

  // mouse y input
  input.mouseY.current = mouse.y;
  input.mouseY.fraction =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
};

var updateOutputs = function() {
  output.x.current = output.x.end - input.mouseX.fraction * output.x.range;
  output.y.current = output.y.end - input.mouseY.fraction * output.y.range;
};

var updateEachParallaxItem = function() {
  //apply output to html
  itemsArray.forEach(function(item, i) {
    var depth = parseFloat(item.dataset.depth);
    var itemOutput = {
      x: output.x.current - output.x.current * depth,
      y: output.y.current - output.y.current * depth,
      zIndex: output.zIndex.range - output.zIndex.range * depth
    };
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform =
      "translate(" + itemOutput.x + "px, " + itemOutput.y + "px)";
    item.style.transition = "all 1s ease-out 0s";
  });
};

var handleMouseMove = function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
};

var handleResize = function() {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;

  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
};

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);

updateInputs();
updateOutputs();
updateEachParallaxItem();
