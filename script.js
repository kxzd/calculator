const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete")
const allClearButton = document.querySelector("[data-all-clear");
const previousScreenText = document.querySelector("[data-previous-operand");
const currentScreenText = document.querySelector("[data-current-operand");

let previousOperand = "";
let currentOperand = "";
let operation = undefined;

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        operationSelection(button.innerText);
        updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    operate();
    updateDisplay();
})

allClearButton.addEventListener("click", button => {
    clearDisplay();
    updateDisplay();
})

deleteButton.addEventListener("click", button => {
    del();
    updateDisplay();
})

window.addEventListener("keydown", function(e) {
    console.log(e);
    if (e.key === "Escape") {
        clearDisplay();
        updateDisplay();
    }
    if (e.key === "Backspace") {
        del();
        updateDisplay();
    }
    if (e.key >= 0 || e.key <= 9 || e.key === ".") {
        appendNumber(e.key);
        updateDisplay();
    }
    if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+" ) {
        if (e.key === "/")
        {
            operationSelection("÷");
            updateDisplay();
        }
        else {
            operationSelection(e.key);
            updateDisplay();
        }
    }
    if (e.key === "=" || e.key === "Enter")
    {
        operate();
        updateDisplay();
    }

})


function appendNumber(number) {
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function updateDisplay() {
    currentScreenText.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousScreenText.innerText = `${getDisplayNumber(previousOperand)} ${operation}`
    }
    else {
        previousScreenText.innerText = "";
    }
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function clearDisplay() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}


function operationSelection(operator) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        operate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = "";
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    let result = 0;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case "+":
            result = add(prev, current);
            break;
        case "-":
            result = subtract(prev, current);
            break;
        case "*":
            result = multiply(prev, current);
            break;
        case "÷":
            if (current === 0) {
                result = "Math ERROR";
                break;
            }
            else {
                result = divide(prev, current)
                break;
            }
        default:
            return;
    }
    if (result === "Math ERROR")
    {
        currentOperand = result;
    }
    else {
        currentOperand = Math.round(result * 1000) / 1000;
    }
    operation = undefined;
    previousOperand = "";
}


function getDisplayNumber(number) {
    if (number === "Math ERROR")
    {
        clearDisplay();
        return "Math ERROR"
    }
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = "";
    }
    else {
        integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
    }
    if  (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }
    else {
        return integerDisplay;     
    }
}