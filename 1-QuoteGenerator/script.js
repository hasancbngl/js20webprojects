let apiQuotes = [];
let quote;
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
    }
}

function newQuote() {
    showLoadingSpinner();
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //reduce font size for long quotes.
    if(quote.text.length >100) {
        quoteText.classList.add('long-quote');
     } else {
        quoteText.classList.remove('long-quote');
     }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

//Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        newQuote();
    }
}
//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    //open in new tab
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//On Load
getQuote();