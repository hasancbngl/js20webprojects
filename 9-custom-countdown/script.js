const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let coundownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60 ;
const day = hour * 24;

const updateDOM = () => {
    coundownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) /hour);
    const minutes = Math.floor((distance % hour) /minute);
    const seconds = Math.floor((distance % minute) /second);
    inputContainer.hidden = true;

     if(distance <0) {
        countdownEl.hidden = true;
        clearInterval(coundownActive);
        completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
     } else {
         countdownElTitle.textContent = `${countdownTitle}`;
         timeElements[0].textContent = `${days}`;
         timeElements[1].textContent = `${hours}`;
         timeElements[2].textContent = `${minutes}`;
         timeElements[3].textContent = `${seconds}`;
         countdownEl.hidden = false;
         completeEl.hidden = true;
     }
    }, second);
}

//set min date to dateEl
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));

    if(countdownDate === '') {
        alert('Please select a date!');
    } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

//reset All values
const resetCountdown = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(coundownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

const restorePrevCountdown = () => {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', resetCountdown);
completeButton.addEventListener('click', resetCountdown);

restorePrevCountdown();
