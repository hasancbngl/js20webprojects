const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

const sendNumberValue = number => {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
};

const clearAll = () => {
    calculatorDisplay.textContent = 0;
};

const addDecimal = () => {
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};

inputButtons.forEach((el) => {
    if(el.classList.length === 0) {
    el.addEventListener('click', ()=>sendNumberValue(el.value));
    } else if(el.classList.contains('operator')) {
        el.addEventListener('click', ()=>sendNumberValue(el.value));
    } else if(el.classList.contains('decimal')) {
        el.addEventListener('click', addDecimal);
    } else {
        el.addEventListener('click', clearAll);
    }
});