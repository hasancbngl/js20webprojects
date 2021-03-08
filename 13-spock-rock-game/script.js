const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const allGameIcons = document.querySelectorAll('.far');
let computerChoice = '';
let computerChoiceNumber = 0;
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
};

const randomComputerChoice = () => {
  computerChoiceNumber = Math.floor(Math.random() *5);
  computerChoice =  choicesEl[computerChoiceNumber];
  computerChoiceEl.textContent = ' ---' + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  let element = document.getElementById(computerChoicesAr[computerChoiceNumber]);
  element.classList.add('selected');
};

//call func to process turn
const checkResult = () => {
  resetSelected();
  randomComputerChoice();
};

//pass player selection and styling icons
const select = playerChoice => {
  checkResult();
  let index;
  choicesEl.forEach((el)=>{
    if(el===playerChoice) {
      index =  choicesEl.indexOf(el);
      playerChoiceEl.textContent = ' ---' + el.charAt(0).toUpperCase() + el.slice(1);
      let element = document.getElementById(playerChoicesAr[index]);
      element.classList.add('selected');
    }
  });
};