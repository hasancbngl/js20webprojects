const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyToScrollAgain = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        readyToScrollAgain = true;
        loader.hidden=true;
    }
   
}

function setAttributesHelper(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributesHelper(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributesHelper(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//unsplash API
const count = 20;
const apiKey = 'API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from unsplash api
async function getPhotos() {
    try {
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();
    } catch(error) {
        console.log(error);
    } 
}
///check if scrolling near to the bottom, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToScrollAgain) {
        readyToScrollAgain = false;
        getPhotos();
    }
})

getPhotos();