var sellPriceText = document.querySelector("#sellPrice");
var buyPriceText = document.querySelector("#buyPrice");
var moneyText = document.getElementById("money");
var started = false;

var historicalPrice = [];
var time = document.getElementById("time");
var money = 10000;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sell = 10;
var buy = 10;
var stocks = 0;

let companyStatusArray = [
  { effect: -7, reason: "High operating costs and low revenue" },
  { effect: -4, reason: "Market competition and decreasing customer base" },
  { effect: -3, reason: "Economic downturn affecting sales" },
  { effect: -2, reason: "Poor marketing strategy and brand image" },
  { effect: -1, reason: "Inefficient internal processes" },
  { effect: 0, reason: "Stable, but not growing" },
  { effect: 1, reason: "Improved customer satisfaction and loyalty" },
  { effect: 2, reason: "Successful product launches" },
  { effect: 3, reason: "Effective cost-cutting measures" },
  { effect: 4, reason: "Growing market share" },
  { effect: 9, reason: "Strong financial performance and high profitability" },
]; // i love chatgpt

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

// Control Flow Speed (larger delay = slower flow)
const updateDelay = 50; // milliseconds

// Initialize with some starting prices
for (let i = 0; i < 50; i++) {
  historicalPrice.push(10 + (Math.random() / 5 - 0.1));
}

window.addEventListener("resize", drawCanvas);
drawCanvas(); // Draw the initial graph

function reduceTime(time) {
  time.innerText =
    String(Math.round(parseFloat(time.innerText) * 10 - 1) / 10)[3] == undefined
      ? String(Math.round(parseFloat(time.innerText) * 10 - 1) / 10) + ".0"
      : String(Math.round(parseFloat(time.innerText) * 10 - 1) / 10);
}

// This would simulate player actions i n a real game
function simulatePlayerActions() {
  // Logic to modify the 'historicalPrice' based on player behavior
  historicalPrice.push(sell + (Math.random() / 5 - 0.1)); // Price fluctuates
  if (historicalPrice.length > 50) {
    historicalPrice.shift();
  }
}

function updateGraph() {
  simulatePlayerActions(); // Simulate changes to prices
  drawCanvas();
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Styling (adjust if desired)
  var size = (window.innerWidth / 5) * 4;
  canvas.style.width = size + "px";
  canvas.style.height = 300 + "px";
  var scale = window.devicePixelRatio;
  canvas.width = size * scale;
  canvas.height = 300 * scale;
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = scale;

  // Graph Calculation
  let top = historicalPrice[0];
  let bottom = historicalPrice[0];
  for (let i = 0; i < historicalPrice.length; i++) {
    top = Math.max(top, historicalPrice[i]);
    bottom = Math.min(bottom, historicalPrice[i]);
  }
  let range = top - bottom;

  // Line Drawing (Bezier Curve)

  for (let i = 1; i < historicalPrice.length; i++) {
    let startX = (size / (historicalPrice.length - 1)) * (i - 1);
    let startY =
      canvas.height -
      ((historicalPrice[i - 1] - bottom) / range) * canvas.height;
    let endX = (size / (historicalPrice.length - 1)) * i;
    let endY =
      canvas.height - ((historicalPrice[i] - bottom) / range) * canvas.height;

    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(midX, midY, endX, endY);
    ctx.stroke();
  }
  var textString = Math.round(((top + bottom) / 2) * 10) / 10;
  ctx.fillText(textString, 50 * scale, canvas.height / 2);
}

// Start the main loop
var mainLoop = setInterval(function () {
  updateGraph();
  reduceTime(time);
  if (started) {
    sellPriceText.innerText = "sell: $" + sell + "/stock";
    buyPriceText.innerText = "buy: $" + buy + "/stock";
    moneyText.innerText = "$" + money;
    if (parseFloat(time.innerText) <= 0) {
      end();
    }
    if (Math.round(parseFloat(time.innerText)) == parseFloat(time.innerText)) {
      sell =
        Math.round(
          (sell +
            companyStatusArray[Math.round(Math.random() * 10)]["effect"] / 10) *
            10
        ) / 10;
      buy = Math.round((sell - Math.random() / 5) * 10) / 10;
    }
  }
}, updateDelay);

function play() {
  started = true;
  document.getElementById("game").classList.add("started");
  document.getElementById("menu").classList.add("started");
  document.getElementById("title").classList.add("started");
  var removeMenu = setTimeout(function () {
    document.getElementById("menu").remove();
  }, 2000);
}

function end() {
  clearTimeout(mainLoop);
  document.getElementById("blur").style.zIndex = 6;
}

function buyStock() {
  var buyAmount = prompt("How many stocks to buy?");
  if (buyAmount == null) {
    return;
  }
  if (isNumeric(buyAmount)) {
    if (buyAmount * buy <= money) {
      stocks += Number(buyAmount);
      money -= buyAmount * buy;
      sell += buyAmount / 500;
    } else {
      alert("Not enough money!");
    }
  } else {
    alert("That isn't a valid number.");
  }
}

function sellStock() {
  var sellAmount = prompt("How many stocks to sell?");
  if (sellAmount == null) {
    return;
  }
  if (isNumeric(sellAmount)) {
    console.log(sellAmount);
    console.log(stocks);
    if (sellAmount <= stocks) {
      money += sellAmount * sell;
      stocks -= Number(sellAmount);
      buy -= sellAmount / 1000;
    } else {
      alert("You cannot sell more stocks than you have.");
    }
  } else {
    alert("That isn't a valid number.");
  }
}
