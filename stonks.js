var priceText = document.querySelector("#price");
var historicalPrice = [];
var players = [
  { stocks: 0, offers: [{ type: "sell", stocks: 200, price: 10 }] },
  { stocks: 200, offers: [] },
  { stocks: 200, offers: [] },
  { stocks: 200, offers: [] },
  { stocks: 200, offers: [] },
];


function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function buy() {
  var buy = prompt("How much to buy?");
  if (isNumeric()) {
  } else {
    alert("That isn't a valid number.");
  }
}

function sell() {
  var buy = prompt("How much to sell?");
  if (isNumeric(sell)) {
  } else {
    alert("That isn't a valid number.");
  }
}

var canvas = document.getElementById("canvas");
console.log(canvas);
var ctx = canvas.getContext("2d");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

setInterval(drawCanvas, 1000);
window.addEventListener("resize", drawCanvas);

function player(players) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].offers[0]) {
      if (players[i].offers[0]["type"] == "sell") {
        priceText.innerText =
          "Price: $" + players[i].offers[0]["price"] + "/stock";
      }
    }
  }
}

function drawCanvas() {
  // Set display size (css pixels).
  var size = window.innerWidth / 2;
  canvas.style.width = size + "px";
  canvas.style.height = 300 + "px";

  // Set actual size in memory (scaled to account for extra pixel density).
  var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  canvas.width = size * scale;
  canvas.height = 300 * scale;

  // Normalize coordinate system to use css pixels.
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = scale;
  ctx.beginPath(); // Start a new path
  ctx.moveTo(0, 0); // Move the pen to (30, 50)
  ctx.lineTo(size, 300); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
  var x = size / 2;
  var y = 300 / 2;

  var textString = "0";
  ctx.fillText(textString, 10, y);
}

drawCanvas();
