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
  };

  Gallery.prototype.show = function() {
    document.querySelector('.overlay-gallery').classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onClickClose);
    this.leftControl.addEventListener('click', this._showPreviousPhoto);
    this.rightControl.addEventListener('click', this._showNextPhoto);
    window.addEventListener('keydown', this._onEscKeyDown);
  };


  Gallery.prototype.hide = function() {
    document.querySelector('.overlay-gallery').classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
  };

  Gallery.prototype._showPreviousPhoto = function() {

  };

  Gallery.prototype._showNextPhoto = function() {

  };

  Gallery.prototype._onClickClose = function() {
    this.hide();
  };


  Gallery.prototype._onEscKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
  };

  window.Gallery = Gallery;
})();
