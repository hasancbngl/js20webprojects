const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playButton = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
const showPlayIcon = (oldAttr, newAttr) => {
    let title = !video.paused ? 'Pause' : 'Play';
    playButton.classList.replace(`fa-${oldAttr}`, `fa-${newAttr}`);
    playButton.setAttribute('title', title);
};

function togglePlay() {
    if(video.paused) {
        video.play();
        showPlayIcon('play', 'pause');
    } else {
        video.pause();
        showPlayIcon('pause', 'play');
    }
}

//onVideo ended show play icon
video.addEventListener('ended', () => showPlayIcon('pause', 'play'));

// Progress Bar ---------------------------------- //
//calc display time format
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

const updateProgress = () => {
    progressBar.style.width = `${video.currentTime / video.duration *100}%`;
    currentTime.textContent = `${formatTime(video.currentTime)} /`;
    duration.textContent = formatTime(video.duration);
};


// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


//EventListeners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('canplay', updateProgress);
video.addEventListener('timeupdate', updateProgress);