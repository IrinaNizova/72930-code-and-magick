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
  if (window.location.hash.match(/#img\/screenshots\/(\S+)/)) {
    gallery.show();
    gallery.setCurrentPicture(window.location.hash);
  }
  var photogallery = document.querySelector('.photogallery');
  var images = photogallery.querySelectorAll('img');
  // При изменении хэша изменится картинка галереи
  window.addEventListener('hashchange', function(event) {
    if (window.location.hash.match(/#img\/screenshots\/(\S+)/)) {
     gallery.show();
     gallery.setCurrentPicture(window.location.hash);
     }
    else if (window.location.hash === '') {
     gallery.hide();
    }
  });

  [].forEach.call(images, function(item, index, array) {
    item.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.setHash(index);
    });
  });
});
