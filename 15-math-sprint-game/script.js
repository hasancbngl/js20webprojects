// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  // const correctEquations = 
  // Set amount of wrong equations
  // const wrongEquations = 
  // Loop through, multiply random numbers up to 9, push to array
  // for (let i = 0; i < correctEquations; i++) {
  //   firstNumber = 
  //   secondNumber = 
  //   const equationValue = firstNumber * secondNumber;
  //   const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
  //   equationObject = { value: equation, evaluated: 'true' };
  //   equationsArray.push(equationObject);
  // }
  // Loop through, mess with the equation results, push to array
  // for (let i = 0; i < wrongEquations; i++) {
  //   firstNumber = 
  //   secondNumber = 
  //   const equationValue = firstNumber * secondNumber;
  //   wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
  //   wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
  //   wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
  //   const formatChoice = 
  //   const equation = wrongFormat[formatChoice];
  //   equationObject = { value: equation, evaluated: 'false' };
  //   equationsArray.push(equationObject);
  // }
}

// Dynamically adding correct/incorrect equations
// function populateGamePage() {
//   // Reset DOM, Set Blank Space Above
//   itemContainer.textContent = '';
//   // Spacer
//   const topSpacer = document.createElement('div');
//   topSpacer.classList.add('height-240');
//   // Selected Item
//   const selectedItem = document.createElement('div');
//   selectedItem.classList.add('selected-item');
//   // Append
//   itemContainer.append(topSpacer, selectedItem);

//   // Create Equations, Build Elements in DOM

//   // Set Blank Space Below
//   const bottomSpacer = document.createElement('div');
//   bottomSpacer.classList.add('height-500');
//   itemContainer.appendChild(bottomSpacer);
// }

const startCountdown = () => {
  countdown.textContent = '3';
  setTimeout(()=> {
    countdown.textContent = '2';
  }, 1000);
  setTimeout(()=> {
    countdown.textContent = '1';
  }, 2000);
  setTimeout(()=> {
    countdown.textContent = 'GO!';
  }, 3000);
};

//show countdown
function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  startCountdown();
}

//get the value from selected radio button
const getRadioValue = () => {
  let radioValue;
  radioInputs.forEach((radioEl) => {
    if(radioEl.checked) {
      radioValue = radioEl.value;
    }
  });
  return radioValue;
};

//deciding amount of questions 
const selectQuestionAmount = (e) => {
  e.preventDefault();
  questionAmount =  getRadioValue();
  if(questionAmount) showCountdown();
};

startForm.addEventListener('click', () => {
  radioContainers.forEach((el) => {
    //remove selected styling
    el.classList.remove('selected-label');
    if(el.children[1].checked) {
      el.classList.add('selected-label');
    }
  });
});

startForm.addEventListener('submit', selectQuestionAmount);