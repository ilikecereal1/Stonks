var priceText = document.querySelector("#price");
var historicalPrice = [];
var graphHistory = [];
var players = [
  { stocks: 0, offers: [{ type: "sell", stocks: 200, price: 10 }], money: 0 },
  { stocks: 200, offers: [], money: 0 },
  { stocks: 200, offers: [], money: 0 },
  { stocks: 200, offers: [], money: 0 },
  { stocks: 200, offers: [], money: 0 },
  { stocks: 0, offers: [], money: 1000 },
  { stocks: 0, offers: [], money: 1000 },
  { stocks: 0, offers: [], money: 1000 },
  { stocks: 0, offers: [], money: 1000 },
  { stocks: 0, offers: [], money: 1000 },
];
var money = 10000;
var time = document.getElementById("time");
function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function buy() {
  var buy = prompt("How much to buy?");
  console.log(typeof buy);
  if (isNumeric(buy)) {
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

function play() {
  document.getElementById("game").style.display = "inline";
  var mainInterval = setInterval(() => main(players, time), 10);
}

window.addEventListener("resize", drawCanvas);

function reduceTime(time) {
  time.innerText = Math.round(parseFloat(time.innerText) * 100 + 1) / 100;
}

function main(players, time) {
  drawCanvas();
  player(players);
  reduceTime(time);
}

function player(players) {
  for (let i = 0; i < players.length; i++) {}
  for (let i = 0; i < players.length; i++) {
    if (players[i].offers[0]) {
      if (players[i].offers[0]["type"] == "sell") {
        if (players[i].offers[0]["stocks"] == 0) {
          players[i].offers.shift();
        } else {
          priceText.innerText =
            "sell: $" + players[i].offers[0]["price"] + "/stock";
          historicalPrice.push(players[i].offers[0]["price"]);
          if (historicalPrice.length > 10) {
            historicalPrice.shift();
          }
        }
      }
    }
  }
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Set display size (css pixels).
  var size = (window.innerWidth / 5) * 4;
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

  console.log(historicalPrice);
  var top = historicalPrice[0];
  var bottom = historicalPrice[0];
  for (let i = 0; i < historicalPrice.length; i++) {
    if (historicalPrice[i] > top) {
      top = historicalPrice[i];
    }
    if (historicalPrice[i] < bottom) {
      bottom = historicalPrice[i];
    }
  }
  var avg = (top + bottom) / 2;
  var range = top - bottom;
  for (let i = 1; i < historicalPrice.length; i++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(
      (size / (historicalPrice.length - 1)) * (i - 1),
      canvas.height -
        ((historicalPrice[i - 1] - bottom) / (range == 0 ? 1 : range)) *
          canvas.height
    ); // Move the pen to (30, 50)
    ctx.lineTo(
      (size / (historicalPrice.length - 1)) * i,
      canvas.height -
        ((historicalPrice[i] - bottom) / (range == 0 ? 1 : range)) *
          canvas.height
    ); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path
  }

  var x = size / 2;
  var y = 300 / 2;

  var textString = Math.round(avg * 10) / 10;
  ctx.fillText(textString, 10 * scale, y);
}

for (let i = 0; i < 10; i++) {
  var push = 9.5 + Math.random();
  historicalPrice.push(push);
}

drawCanvas();

var titlescreen = setInterval(function() {
  var push = 9.5 + Math.random();
  historicalPrice.push(push);
  historicalPrice.shift()
drawCanvas()
}, 1000);
