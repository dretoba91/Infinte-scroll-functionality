'use strict';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Setting varaibles to take effect when the page first loads
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// we creating a photoArray to receive all data from fetch(i.e the API)
let photoArray = [];

// Unsplash API

const count = 30;
const apiKey = '3I2TAQ84xGM1KrHnFTqTxn42yTbtQ3qg-hp-j8IQe_M';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

// Checking if all images were loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;

    // making the loader image hidden when the page loads for the first time
    loader.hidden = true;

  }
}

// For CODE REFACTORING: creating a HElper Function to Set Attributes on the DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    // looping through the attributes object to get the key(property) and attributes[key](values)
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and Photos and Add to DOM
function displayPhotos() {
  //resetting the value of imagesLoad back to zero when the function is called in order for the condition stated in the imageLoaded function to be meet.
  imagesLoaded = 0;

  // setting the vaule for the totalImgaes when this function is been called
  totalImages = photoArray.length;
  // Run function for each  obeject in the photoArray
  photoArray.forEach(photo => {
    // Create <a></a> in the html to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');

    // CODE REFACTORING
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> in the html to display the photo coming from the Unsplash API
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    // CODE REFACTORING
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listenner, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Putting the <img> inside the <a></a>, then put both inside the imageContainer Element.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);

    // receiving data from the API
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Checking if the Scroll is near bottom page, and Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // setting ready to equal false immediately thiseven takes place
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();
