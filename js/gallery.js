/**
 * Created by ira on 14.02.16.
 */

'use strict';

define(function() {
  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this.leftControl = this.element.querySelector('.overlay-gallery-control-left');
    this.rightControl = this.element.querySelector('.overlay-gallery-control-right');
    this._leftArrow = this._leftArrow.bind(this);
    this._rightArrow = this._rightArrow.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this.currentPhotoNumber = null;
    this.setCurrentPhotoNumber = this.setCurrentPhotoNumber.bind(this);
  };

  Gallery.prototype.setCurrentPhotoNumber = function(value) {
    this.currentPhotoNumber = value;
  };

  Gallery.prototype.getCurrentPhotoNumber = function() {
    return this.currentPhotoNumber;
  };

  Gallery.prototype.show = function() {
    document.querySelector('.overlay-gallery').classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onCloseClick);
    this.leftControl.addEventListener('click', this._leftArrow);
    this.rightControl.addEventListener('click', this._rightArrow);
    window.addEventListener('keydown', this._onDocumentKeyDown);
  };


  Gallery.prototype.hide = function() {
    document.querySelector('.overlay-gallery').classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.location.hash = ''
  };

  Gallery.prototype.setPictures = function(arrayPictures) {
    this.arrayPictures = arrayPictures;
  };

  var lastPicture = '';
  Gallery.prototype.setCurrentPicture = function(num) {
  if (typeof num === 'string') {
    window.location.hash = num;
    console.log('stroka');
  } else {
    var preview = document.querySelector('.overlay-gallery-preview');
    if (num < this.arrayPictures.length) {
      var picture = this.arrayPictures[num];
      if (lastPicture) {
        preview.removeChild(lastPicture);
      }
      preview.appendChild(picture);
      document.querySelector('.preview-number-current').textContent = num + 1;
      document.querySelector('.preview-number-total').textContent = this.arrayPictures.length;
      this.setCurrentPhotoNumber(num);
      lastPicture = picture;
      }
    }
  };

  Gallery.prototype._leftArrow = function() {
    if (this.currentPhotoNumber > 0) {
      this.setCurrentPicture(this.currentPhotoNumber - 1);
    }
  };

  Gallery.prototype._rightArrow = function() {
    if (this.currentPhotoNumber < 10) {
      this.setCurrentPicture(this.currentPhotoNumber + 1);
    }
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };


  Gallery.prototype._onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
    if (event.keyCode === 37) {
      this._leftArrow();
    }
    if (event.keyCode === 39) {
      this._rightArrow();
    }
  };

  return Gallery;
});
