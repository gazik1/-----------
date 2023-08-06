function createNumberBox() {
  let boxNumber = document.getElementsByClassName("calculatorBox-number")[0];
  let boxOperation = document.getElementsByClassName(
    "calculatorBox-operation"
  )[0];

  let number = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

  let operation = ["⌫", "+", "-", "÷", "×", "="];

  number = number.map(numberButton => {
    let button = document.createElement("button");
    button.classList.add("number");
    let text = document.createTextNode(numberButton);
    button.appendChild(text);
    boxNumber.appendChild(button);
    return button;
  });

  operation = operation.map(operationButton => {
    let button = document.createElement("button");
    button.classList.add("operation");
    let text = document.createTextNode(operationButton);
    button.appendChild(text);
    boxOperation.appendChild(button);
    return button;
  });

  return { number: number, operation: operation };
}

function calculat(str) {
  let operation = ["+", "-", "÷", "×"];

  if (operation.includes(str[str.length - 1]))
    return str.slice(0, str.length - 1);

  if (str.includes("+")) {
    return str
      .split("+")
      .map(v => Number(v))
      .reduce((v1, v2) => +v1 + v2)
     
  }
  if (str.includes("-")) {
    return str
      .split("-")
      .map(v => Number(v))
      .reduce((v1, v2) => +v1 - +v2)
     
  }
  if (str.includes("÷")) {
    if (str.split("÷")[0] == "0" || str.split("÷")[1] == "0") return "";
    return str
      .split("÷")
      .map(v => Number(v))
      .reduce((v1, v2) => +v1 / +v2)
    
  }
  if (str.includes("×")) {
    return str
      .split("×")
      .map(v => Number(v))
      .reduce((v1, v2) => +v1 * +v2)
     
  }

  throw Error("Проблема с входными данными");
}

function maxFixed(number){
 return Math.floor(number*1000)/1000
}


function addListner(obj) {
  let input = document.getElementById("calculatorBox-input");

  let { operation, number } = obj;

  number.map(numberButton => {
    numberButton.addEventListener("click", event => {
      input.value = input.value + numberButton.textContent;
    });
  });

  let deletion = operation[0];
  let equally = operation[operation.length - 1];

  equally.addEventListener("click", event => {
    input.value =maxFixed( calculat(input.value));
  });

  deletion.addEventListener("click", event => {
    input.value = input.value.slice(0, input.value.length - 1);
  });

  operation.slice(1, operation.length - 1).map(operationButton => {
    operationButton.addEventListener("click", event => {
      let operation = ["+", "-", "÷", "×"];

      operation.forEach(v => {
        if (input.value.includes(v)) {
          input.value = maxFixed(calculat(input.value));
        }
      });

      input.value = input.value + operationButton.textContent;
    });
  });
}

function start() {
  let button = createNumberBox();
  addListner(button);
}
start();
