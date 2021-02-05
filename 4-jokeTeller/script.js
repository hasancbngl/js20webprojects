const button = document.getElementById('button');
const audioElement= document.getElementById('audio');

const apiKey = 'API_KEY';

//Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMeJoke(joke) {
     VoiceRSS.speech({
            key: apiKey,
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

//get jokes from API
async function getJokes() {
    let joke;
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }else {
            joke = data.joke; 
        }
      tellMeJoke(joke);
      toggleButton();
    } catch(error) {
        console.log(error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);