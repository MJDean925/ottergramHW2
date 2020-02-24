var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var LEFT_ARROW = '[data-image-role="previous"]';
var RIGHT_ARROW = '[data-image-role="next"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickhandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickhandler);
  addKeyPressHandler();
  document.querySelector(LEFT_ARROW).addEventListener('click', function(event) {
    event.preventDefault();
    thumbnails = getThumbnailsArray();
    var detail = document.querySelector(DETAIL_IMAGE_SELECTOR);
    //Iterate through list of thumbnails looking for a match
    for (var index = 0; index < thumbnails.length; index++) {
      //If a thumbnail is found matching the detail image, then -1 is the previous
      if (thumbnails[index].getAttribute('data-image-url') === detail.getAttribute('src')) {
        //If at the beginning go to end
        if (index === 0) {
          index = thumbnails.length;
        }
        //Set details show, and break out of loop
        setDetailsFromThumb(thumbnails[index - 1]);
        showDetails();
        break;
      }
    }
  });
  document.querySelector(RIGHT_ARROW).addEventListener('click', function(event) {
    event.preventDefault();
    thumbnails = getThumbnailsArray();
    var detail = document.querySelector(DETAIL_IMAGE_SELECTOR);
    //Iterate through list of all thumbnails
    for (var index = 0; index < thumbnails.length; index++) {
      //If a thumbnail is found matching the detail image, then +1 is the next
      if (thumbnails[index].getAttribute('data-image-url') === detail.getAttribute('src')) {
        //If at the end of the list go back to beginning
        if (index === thumbnails.length - 1) {
          index = -1;
        }
        //Set details, show, and break out of loop
        setDetailsFromThumb(thumbnails[index + 1]);
        showDetails();
        break;
      }
    }
  });
}

initializeEvents();
