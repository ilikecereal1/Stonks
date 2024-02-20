var sellPriceText = document.querySelector("#sellPrice");
var buyPriceText = document.querySelector("#buyPrice");
var moneyText = document.getElementById("money");
var endBlur = document.getElementById("endBlur");
var endText = document.getElementById("endText");

var questions = [
  [
    { question: "What is the result of 5 + 3?", answer: 8 },
    { question: "How many fingers do you have on one hand?", answer: 5 },
    {
      question:
        "If you have 2 apples and eat one, how many apples do you have left?",
      answer: 1,
    },
    { question: "Count from 1 to 10.", answer: 10 },
    {
      question: "What is the missing number in the sequence: 2, 4, __, 8, 10?",
      answer: 6,
    },
    { question: "How many sides does a square have?", answer: 4 },
    {
      question:
        "If you have 3 toys and gain 2 more, how many toys do you have now?",
      answer: 5,
    },
    { question: "What comes after 9 in the number sequence?", answer: 10 },
    {
      question:
        "If you have 4 cookies and give 1 to a friend, how many do you have left?",
      answer: 3,
    },
    { question: "What is the sum of 2 and 6?", answer: 8 },
  ],
  [
    { question: "What is the result of 15 - 7?", answer: 8 },
    { question: "How many days are there in a week?", answer: 7 },
    {
      question:
        "If a rectangle has 3 sides with equal length, what shape is it?",
      answer: "triangle",
    },
    { question: "Count backward from 20 to 11.", answer: 11 },
    { question: "What is the product of 4 and 5?", answer: 20 },
    { question: "How many vertices does a cube have?", answer: 8 },
    {
      question:
        "If you have 18 marbles and lose 4, how many marbles do you have left?",
      answer: 14,
    },
    { question: "What comes before 30 in the number sequence?", answer: 29 },
    {
      question:
        "If a box contains 9 chocolates and you take 3, how many chocolates are left?",
      answer: 6,
    },
    { question: "What is the sum of 9 and 13?", answer: 22 },
  ],
  [
    { question: "What is the result of 24 ÷ 4?", answer: 6 },
    { question: "How many months are there in a year?", answer: 12 },
    {
      question: "If a triangle has three equal sides, what is it called?",
      answer: "equilateral triangle",
    },
    { question: "Count by 5s from 25 to 50.", answer: 50 },
    { question: "What is the difference between 15 and 8?", answer: 7 },
    { question: "How many edges does a rectangular prism have?", answer: 12 },
    {
      question:
        "If you have 35 stickers and give away 10, how many stickers do you have left?",
      answer: 25,
    },
    { question: "What is the next multiple of 9 after 27?", answer: 36 },
    {
      question:
        "If a garden has 16 rows of flowers and each row has 7 flowers, how many flowers are there in total?",
      answer: 112,
    },
    { question: "What is the sum of 17 and 25?", answer: 42 },
  ],
  [
    { question: "What is the result of 63 ÷ 9?", answer: 7 },
    { question: "How many continents are there in the world?", answer: 7 },
    {
      question: "If a polygon has 8 sides, what is it called?",
      answer: "octagon",
    },
    { question: "Count by 8s from 32 to 64.", answer: 64 },
    { question: "What is the product of 9 and 6?", answer: 54 },
    { question: "How many faces does a triangular pyramid have?", answer: 4 },
    {
      question:
        "If you have 48 balloons and 12 of them pop, how many balloons do you have left?",
      answer: 36,
    },
    { question: "What is the next prime number after 29?", answer: 31 },
    {
      question:
        "If a book has 27 chapters and you read 9 chapters, how many chapters are left?",
      answer: 18,
    },
    { question: "What is the sum of 36 and 47?", answer: 83 },
  ],
  [
    { question: "What is the result of 87 ÷ 3?", answer: 29 },
    { question: "How many oceans are there on Earth?", answer: 5 },
    {
      question: "If a shape has 10 sides, what is it called?",
      answer: "decagon",
    },
    { question: "Count by 7s from 21 to 56.", answer: 56 },
    { question: "What is the difference between 64 and 29?", answer: 35 },
    { question: "How many edges does a cube have?", answer: 12 },
    {
      question:
        "If you have 75 candies and share them equally among 5 friends, how many candies does each friend get?",
      answer: 15,
    },
    { question: "What is the next multiple of 11 after 44?", answer: 55 },
    {
      question:
        "If a garden has 20 rows of plants and each row has 8 plants, how many plants are there in total?",
      answer: 160,
    },
    { question: "What is the sum of 58 and 97?", answer: 155 },
  ],
];

var started = false;
var year = 0;
var historicalPrice = [];
var time = document.getElementById("time");
var money = 10000;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sell = 10;
var buy = 10;
var stocks = 0;
var transactions = 0;
var extra = 0;

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
  if (started) {
    reduceTime(time);
    sellPriceText.innerText = "sell: $" + sell + "/stock";
    buyPriceText.innerText = "buy: $" + buy + "/stock";
    moneyText.innerText = "$" + money;
    if (parseFloat(time.innerText) <= 0 || transactions >= 10) {
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
  endBlur.style.zIndex = 6;
  endBlur.classList.add("ended");
  if (Math.round(Math.random()) == 0) {
    console.log("hi")
    extra = (money - money * (Math.random() / 5 + 0.8)) * -1;
  } else {
    console.log("no")
    extra = (money - money * (Math.random() / 2 + 1)) * -1;
  }
  endText.innerText = `You ${
    extra > 0
      ? `got an extra $${extra} after company profits.`
      : `lost $${extra} after taxes`
  }\n Grand total: ${money + extra}`;
  endText.classList.add("ended")
  clearTimeout(mainLoop);
}

function buyStock() {
  var buyAmount = prompt("How many stocks to buy?");
  if (buyAmount == null) {
    return;
  }
  if (isNumeric(buyAmount)) {
    if (buyAmount * buy <= money) {
      var question = Math.floor(Math.random() * 10);
      var userAnswer = prompt(questions[year][question]["question"]);
      if (userAnswer == questions[year][question]["answer"]) {
        stocks += Number(buyAmount);
        money -= buyAmount * buy;
        sell += buyAmount / 500;
      } else {
        prompt("Wrong answer! You lost one transaction");
      }
      transactions += 1;
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
      var question = Math.floor(Math.random() * 20);
      var userAnswer = prompt(questions[year][question]["question"]);
      if (userAnswer == questions[year][question]["answer"]) {
        money += sellAmount * sell;
        stocks -= Number(sellAmount);
        buy -= sellAmount / 1000;
      } else {
        prompt("Wrong answer! You lost one transaction");
      }
      transactions += 1;
    } else {
      alert("You cannot sell more stocks than you have.");
    }
  } else {
    alert("That isn't a valid number.");
  }
}
