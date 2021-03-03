const player = document.querySelector('.player');
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
const speed = document.querySelector('.player-speed');

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

const setProgress = e => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime *100}%`;
    video.currentTime = newTime * video.duration;
};

// Volume Controls --------------------------- //
let lastVolume = 1;

const changeVolume = e => {
    let volume = e.offsetX / volumeRange.offsetWidth;
    if(volume <0.1) volume = 0;
    if(volume >0.9) volume = 1;

    volumeBar.style.width = `${volume *100}%`;
    video.volume = volume;
    //changing volume icon
    volumeIcon.classList = '';
    if(volume >0.7) volumeIcon.classList.add('fas', 'fa-volume-up');
    else if(volume <0.7 && volume>0) volumeIcon.classList.add('fas', 'fa-volume-down');
    else if(volume === 0) volumeIcon.classList.add('fas', 'fa-volume-off');

    lastVolume = volume;
};

//mute/unmute
function toggleMute() {
    volumeIcon.classList = '';
    if(video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'UnMute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume*100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //
const changeSpeed = () => {
    video.playbackRate = speed.value;
};


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullScreen = false;

function toggleFullScreen() {
    !fullScreen ? openFullscreen(player) : closeFullscreen();
    fullScreen = !fullScreen;
}

//EventListeners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('canplay', updateProgress);
video.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullScreen);