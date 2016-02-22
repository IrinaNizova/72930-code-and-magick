/**
 * Created by ira on 14.02.16.
 */

'use strict';

(function() {
  var Gallery = function() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this.leftControl = this.element.querySelector('.overlay-gallery-control-left');
    this.rightControl = this.element.querySelector('.overlay-gallery-control-right');
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this.currentPhotoNumber = 1;
    this.setCurrentPhotoNumber = this.setCurrentPhotoNumber.bind(this);
    this.getCurrentPhotoNumber = this.getCurrentPhotoNumber.bind(this);
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
  };

  Gallery.prototype.setPictures = function(arrayPictures) {
    this.arrayPictures = arrayPictures;
  };

  var lastPicture = '';
  Gallery.prototype.setCurrentPicture = function(num) {
    var preview = document.querySelector('.overlay-gallery-preview');
    var picture = this.arrayPictures[num];
    if (lastPicture) {
      preview.removeChild(lastPicture);
    }
    preview.appendChild(picture);
    document.querySelector('.preview-number-current').textContent = num + 1;
    document.querySelector('.preview-number-total').textContent = this.arrayPictures.length;
    this.setCurrentPhotoNumber(num);
    lastPicture = picture;
  };

  Gallery.prototype._leftArrow = function() {
    if (this.getCurrentPhotoNumber() > 1) {
      this.setCurrentPicture(this.getCurrentPhotoNumber() - 1);
    }
  };

  Gallery.prototype._rightArrow = function() {
    this.setCurrentPicture(this.getCurrentPhotoNumber() + 1);
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

  window.Gallery = Gallery;
})();
