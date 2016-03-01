/**
 * Created by ira on 20.02.16.
 */
'use strict';


define(['gallery',
        'photo'],
function(Gallery, Photo) {
  var photos = document.querySelectorAll('.photogallery-image');
  // Создание массива картинок
  var photosArray = Array.prototype.slice.call(photos).map(function(item) {
    var src = item.querySelector('img').src;
    return new Photo(src);
  });
  var gallery = new Gallery();
  // В галерею помещается массив картинок
  gallery.setPictures(photosArray);
  var photogallery = document.querySelector('.photogallery');
  var images = photogallery.querySelectorAll('img');
  // При нажатии на картинку открывается галерея
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
      return function() {
        gallery.show();
        gallery.setCurrentPicture(i);
      };
    }(i));
  }
});
