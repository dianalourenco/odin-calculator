let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.getElementById("display");

// Basic math operators functions
function add(x,y) {return x + y;}

function subtract(x,y) {return x - y;}

function multiply(x,y) {return x * y;}

function divide(x, y) {
    if (y === 0) {
        return "ERROR";
    }
    return x / y;
} 


function operate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "/") {
        return divide(firstNumber, secondNumber);
    }
}

//Clear display
function clearDisplay() {
    display.value = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}


// Number Input
function inputNumber(number) {
    currentInput += number;
    updateDisplay();
}

//Operator Input
function inputOperator(nextOperator) {
    if (currentInput === "" && previousInput === "") return;

    if (operator !== null && currentInput !== "") {
        // Already pending calculation -- calculate  it
        const result = operate(Number(previousInput), operator, Number(currentInput));
        previousInput = result.toString();
        currentInput = ""
    } else if (currentInput !== "") {
        // First operator press - store the number
        previousInput = currentInput;
        currentInput = ""
    }

    operator = nextOperator;
    updateDisplay();
}

// Update display

function updateDisplay() {
    if (previousInput !== "" && operator !== null) {
        display.value = previousInput + operator + currentInput;
    } else {
        display.value = currentInput || previousInput;
    }
}

// Equal
const equal = document.getElementById("equal");

equal.addEventListener(`click`, () => {
    if (operator === null || currentInput === "") return;

    const result = operate(Number(previousInput), operator, Number(currentInput));

    if (result === "ERROR") {
        display.value = "ERROR";
        currentInput = "";
        previousInput = "";
        operator = null;
    } else {
        display.value = result;
        previousInput = result.toString();
        currentInput = "";
        operator = null;
    }

    });