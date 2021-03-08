const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
};

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

//pass player selection and styling icons
const select = playerChoice => {
  resetSelected();

  let chosen = '';
  //add selected styling
  switch(playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      chosen = 'Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      chosen = 'Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      chosen = 'Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      chosen = 'Lizard';
      break;
      case 'spock':
      playerSpock.classList.add('selected');
      chosen = 'Spock';
      break;
      default:
        break;
  }
  playerChoiceEl.textContent = '---' + chosen;
};