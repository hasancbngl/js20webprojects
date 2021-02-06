const music = document.querySelector('audio');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');

//Music
const songs = [
    {
        name: 'music-1',
        displayName: 'Gnat',
        artist: 'Eminem',
    },
    {
        name: 'music-2',
        displayName: 'Higher',
        artist: 'Eminem',
    },
    {
        name: 'music-3',
        displayName: 'Electric-Chill',
        artist: 'Jack',
    }
];

let isPlaying = false;

function changeProp(oldIcon, newIcon) {
    playButton.classList.replace(oldIcon, newIcon);
}

function playSong() {
    isPlaying = true;
    changeProp('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    changeProp('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

playButton.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpeg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    if(songIndex<0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

const nextSong = () => {
    songIndex++;
    if(songIndex> songs.length-1) {
         songIndex = 0; 
        }
    loadSong(songs[songIndex]);
    playSong();
}

const updateProgressBar = (e) => {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationInMin = Math.floor(duration / 60);
        let durationInSec = Math.floor(duration % 60);
        if(durationInSec <10) {
            durationInSec = `0${durationInSec}`;
        }
        if(durationInSec) {
        durationEl.textContent = `${durationInMin}:${durationInSec}`;
        }

      const currentInMin = Math.floor(currentTime / 60);
        let currentInSec = Math.floor(currentTime % 60);
        if(currentInSec <10) {
            currentInSec = `0${currentInSec}`;
        }
        if(currentInSec) {
        currentTimeEl.textContent = `${currentInMin}:${currentInSec}`;
        }
    }
}

function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = clickX / width * duration;

}

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);