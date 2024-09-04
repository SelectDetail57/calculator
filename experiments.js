let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const numberDisplay = document.querySelector(".number-display");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  console.log({ number });
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleMath(value) {
  if (buffer === 0) {
    //nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
  console.log(runningTotal);
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "X":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "=":
      if (previousOperator === null)
        //null
        return;

      flushOperation(parseInt(buffer));
      previousOperator = "null";
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = 0;
      } else {
        buffer = buffer.substring(0, buffer.lenth - 1);
      }
      break;
    case "+":
    case "-":
    case "X":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function init() {
  document.querySelector(".calc-body");
  addEventListener("click", function (event) {
    buttonClick(event.target.dataset.value);
  });
}

function rerender() {
  numberDisplay.innerText = buffer;
}

init();
