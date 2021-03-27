const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
//calculate values 
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

const sendNumberValue = number => {
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
};

//reset values
const clearAll = () => {
    calculatorDisplay.textContent = 0;
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
};

const addDecimal = () => {
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};
const addOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //ready for next value, store operator 
    awaitingNextValue = true;
    operatorValue = operator;
};

inputButtons.forEach((el) => {
    if(el.classList.length === 0) {
    el.addEventListener('click', ()=>sendNumberValue(el.value));
    } else if(el.classList.contains('operator')) {
        el.addEventListener('click', ()=>addOperator(el.value));
    } else if(el.classList.contains('decimal')) {
        el.addEventListener('click', addDecimal);
    } else {
        el.addEventListener('click', clearAll);
    }
});