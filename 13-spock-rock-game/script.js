import {startConfetti, removeConfetti, stopConfetti} from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const allGameIcons = document.querySelectorAll('.far');
let computerChoice = '';
let playerScoreNumber = 0;
let computerScore = 0;
const choicesEl = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const computerChoicesAr = ['computerRock', 'computerPaper', 'computerScissors', 'computerLizard', 'computerSpock'];
const playerChoicesAr = ['playerRock', 'playerPaper', 'playerScissors', 'playerLizard', 'playerSpock'];

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
};

const resetAll = () => {
  playerScoreNumber = 0;
  computerScore = 0;
  resultText.textContent = '';
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScore;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resetSelected();
};
window.resetAll = resetAll;

const randomComputerChoice = () => {
  let computerChoiceNumber = Math.floor(Math.random() *5);
  computerChoice =  choicesEl[computerChoiceNumber];
  computerChoiceEl.textContent = ' ---' + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  let element = document.getElementById(computerChoicesAr[computerChoiceNumber]);
  element.classList.add('selected');
};

//check result, increase scores, update result Text
const updateScore = (playerChoice) => {
  if(playerChoice === computerChoice) {
    resultText.textContent = "It's a Tie";
  } else {
    let text;
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      text = 'You won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      computerScore++;
      text = 'You Lost!';
      computerScoreEl.textContent = computerScore;
    }
    resultText.textContent = text;
  }
};

//call func to process turn
const checkResult = (playerChoice) => {
  resetSelected();
  randomComputerChoice();
  updateScore(playerChoice);
};

//pass player selection and styling icons
const select = playerChoice => {
  checkResult(playerChoice);
  let index;
  choicesEl.forEach( el =>{
    if(el===playerChoice) {
      index =  choicesEl.indexOf(el);
      playerChoiceEl.textContent = ' ---' + el.charAt(0).toUpperCase() + el.slice(1);
      let element = document.getElementById(playerChoicesAr[index]);
      element.classList.add('selected');
    }
  });
};
window.select = select;

resetAll();