/**
 * Created by ira on 20.02.16.
 */
'use strict';
/* global Gallery, Photo: true */

(function() {
  var photos = document.querySelectorAll('.photogallery-image');
  var photosArray = Array.prototype.slice.call(photos).map(function(item) {
    var src = item.querySelector('img').src;
    return Photo(src);
  });
  var gallery = new Gallery();
  gallery.setPictures(photosArray);
  var photogallery = document.querySelector('.photogallery');
  var images = photogallery.querySelectorAll('img');
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function(i) {
      return function() {
        gallery.show();
        gallery.setCurrentPicture(i);
      };
    }(i));
  }
})();
