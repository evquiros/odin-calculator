const buttons = document.querySelectorAll(".button");
const screenText = document.querySelector(".screen-text");
const equation = document.querySelector(".equation");
const btnDelete = document.querySelector(".button.del");
const btnDecimal = document.querySelector(".button.decimal");

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';

const MAX_CHARACTERS = 15;

updateScreenText('0');
equation.textContent = '';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    return a / b;
}

function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;

    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
        default:
            return;
    }
    return formatResult(result);
}

function formatResult(result) {
    if (Number.isInteger(result)) {
        return result.toString(); 
    } else {
        return result.toFixed(1); 
    }
}

function selectedNumber() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let num = button.innerText;
            if (!isNaN(num)) {
                if (!currentOperator) {
                    if (firstNumber.length < MAX_CHARACTERS) {
                        if (firstNumber === '0' && num !== '0') {
                            firstNumber = num;
                        } else {
                            firstNumber += num;
                        }
                        updateScreenText(firstNumber);
                    } else {
                        displayError("Out of Bounds");
                    }
                } else {
                    if (secondNumber.length < MAX_CHARACTERS) {
                        secondNumber += num;
                        updateScreenText(secondNumber);
                    } else {
                        displayError("Out of Bounds");
                    }
                }
            }
        });
    });
}

function displayError(message) {
    updateScreenText(message);
    setTimeout(() => {
        clear();
    }, 2000);
}

function selectedOperator() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let operator = button.innerText;
            const operators = ['x', '÷', '-', '+', '='];

            if (!firstNumber) {
                firstNumber = '0';
                updateScreenText(firstNumber);
            }

            if (operators.includes(operator)) {
                if (operator === '=') {
                    if (firstNumber && secondNumber && currentOperator) {
                        let result = String(operate(firstNumber, secondNumber, currentOperator));
                        updateScreenText(result);
                        equation.textContent = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
                        firstNumber = result;
                        secondNumber = '';
                        currentOperator = '';
                    }
                } else {
                    if (currentOperator && secondNumber) {
                        firstNumber = String(operate(firstNumber, secondNumber, currentOperator));
                        secondNumber = '';
                        updateScreenText(firstNumber);
                        equation.textContent = `${firstNumber} ${currentOperator}`;
                    }
                    currentOperator = operator;
                    equation.textContent = `${firstNumber} ${currentOperator}`;
                    updateScreenText(firstNumber);
                }
            }
        });
    });
}

function updateScreenText(content) {
    screenText.textContent = content;

    if (content.length > 10) {
        screenText.style.fontSize = "2rem";
    } else if (content.length > 5) {
        screenText.style.fontSize = "3rem";
    } else {
        screenText.style.fontSize = "4rem";
    }
}

function handleDelete() {
    if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        updateScreenText(secondNumber || '0');
    } else if (currentOperator) {
        currentOperator = '';
        equation.textContent = `${firstNumber}`;
        updateScreenText(firstNumber);
    } else {
        firstNumber = firstNumber.slice(0, -1);
        updateScreenText(firstNumber || '0');
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    updateScreenText('0');
    equation.textContent = '';
}

function addDecimal() {
    if (secondNumber) {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            updateScreenText(secondNumber);
        }
    } else {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            updateScreenText(firstNumber);
        }
    }
}

document.querySelector(".button.decimal").addEventListener("click", addDecimal);
document.querySelector(".button.ac").addEventListener("click", clear);
document.querySelector(".button.del").addEventListener("click", handleDelete);

selectedNumber();
selectedOperator();
