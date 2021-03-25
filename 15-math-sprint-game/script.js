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
let playerGuessAr = [];
let bestScoreAr = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;

//refresh splash page best scores
function bestScoresToDom() {
  bestScores.forEach((el, index)=> {
    el.textContent = `${bestScoreAr[index].bestScore}s`;
  });
}

//check local storage for best scores
const getBestScores=() => {
  if(localStorage.getItem('bestScores')) {
    bestScoreAr = JSON.parse(localStorage.bestScores);
  } else {
    bestScoreAr = [
      {questions: 10, bestScore: finalTimeDisplay},
      {questions: 25, bestScore: finalTimeDisplay},
      {questions: 50, bestScore: finalTimeDisplay},
      {questions: 100, bestScore: finalTimeDisplay}
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoreAr));
  }
  bestScoresToDom();
}

const updateBestScore = () => {
  bestScoreAr.forEach((score, index) => {
    if(questionAmount == score.questions) {
      const savedBestScore = Number(bestScoreAr[index].bestScore);
      if(savedBestScore === 0 || savedBestScore > finalTime) {
        bestScoreAr[index].bestScore = finalTimeDisplay;
      }
    }
  });
  bestScoresToDom();
  localStorage.setItem('bestScores', JSON.stringify(bestScoreAr));
};

const playAgain=() => {
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  equationObject = {};
  playerGuessAr = [];
  valueY=0;
  playAgainBtn.hidden = true;
};

const showScorePage=() => {
  setTimeout(()=>{
    playAgainBtn.hidden = false;
  },1600);
  gamePage.hidden = true;
  scorePage.hidden = false;
};

//format anddisplay time
const scoresToDom = () => {
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty Time + ${penaltyTime}s`;
  updateBestScore();
  itemContainer.scrollTo({top:0, behavior: 'instant'});
  showScorePage();
};

const checkTime = () => {
  console.log(timePlayed);
  if(playerGuessAr.length==questionAmount) {
    console.log('player guess', playerGuessAr);
    clearInterval(timer);
    //check the wrong guesses, add penalty time
    equationsArray.forEach((equationEl, index) => {
      if(!equationEl.evaluated===playerGuessAr[index]) {
        //correct guess no pnealty
        penaltyTime+=0.5; 
      }
    });
    finalTime = timePlayed + penaltyTime;
    scoresToDom();
  }
};

function addTime() {
  timePlayed += 0.1;
  checkTime();
}

//start timer when game page is clicked
const startTimer = () => {
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
};

//scroll and store user selection 
const select= (guessedValue) => {
  let value;
  valueY += 80;
  itemContainer.scroll(0, valueY);
  guessedValue ? value='true' : value='false';
  return playerGuessAr.push(value);
};

const displayGamePage=() => {
  gamePage.hidden = false;
  countdownPage.hidden = true;
};

const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Create Correct/Incorrect Random Equations
function createEquations() {
  const correctEquations = generateRandomNumber(questionAmount);
  const wrongEquations = questionAmount - correctEquations;
  console.log('correct: ', correctEquations);
  console.log('wrong: ', wrongEquations);
  //Loop through, multiply random numbers up to 9, push to array
   for (let i = 0; i < correctEquations; i++) {
     firstNumber = generateRandomNumber(12);
     secondNumber = generateRandomNumber(12);
     const equationValue = firstNumber * secondNumber;
     const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
     equationObject = { value: equation, evaluated: 'true' };
     equationsArray.push(equationObject);
   }
  // Loop through, mess with the equation results, push to array
   for (let i = 0; i < wrongEquations; i++) {
     firstNumber = generateRandomNumber(12);
     secondNumber = generateRandomNumber(12);
     const equationValue = firstNumber * secondNumber;
     wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
     wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
     wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
     wrongFormat[3] = `${firstNumber+2} x ${secondNumber-1} = ${equationValue - 1}`;
     wrongFormat[4] = `${firstNumber - 1} x ${secondNumber} = ${equationValue +2}`;
     const formatChoice = generateRandomNumber(5);
     const equation = wrongFormat[formatChoice];
     equationObject = { value: equation, evaluated: 'false' };
     equationsArray.push(equationObject);
   }
   shuffle(equationsArray);
}

const equationsToDom = () => {
  equationsArray.forEach((equationEl) => {
    const item = document.createElement('div');
    item.classList.add('item');
    const equationText = document.createElement('h1');
    equationText.textContent = equationEl.value;
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
};

  //dynamically adding correct/incorrect equations
  function populateGamePage() {
   // Reset DOM, Set Blank Space Above
   itemContainer.textContent = '';
   // Spacer
   const topSpacer = document.createElement('div');
   topSpacer.classList.add('height-240');
   // Selected Item
   const selectedItem = document.createElement('div');
   selectedItem.classList.add('selected-item');
   // Append
   itemContainer.append(topSpacer, selectedItem);  
   // Create Equations, Build Elements in DOM
   createEquations();
   equationsToDom();
   // Set Blank Space Below
   const bottomSpacer = document.createElement('div');
   bottomSpacer.classList.add('height-500');
   itemContainer.appendChild(bottomSpacer);
}

const startCountdown = () => {
  let count = 4;
  const countdownTimer = setInterval(()=> {
    count--;
    if(count===0) countdown.textContent = 'GO!';
    else if(count===-1){
      displayGamePage();
      clearInterval(countdownTimer);
    } else countdown.textContent = count;
  },1000);

};

//show countdown
function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  populateGamePage();
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

gamePage.addEventListener('click', startTimer);
playAgainBtn.addEventListener('click', playAgain);

//on Load
getBestScores();