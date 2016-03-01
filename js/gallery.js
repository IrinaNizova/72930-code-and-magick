/**
 * Created by ira on 14.02.16.
 */

'use strict';

define(function() {
  /**
   * Конструктор объекта Gallery. Привязывает нужные функции к текущему контексту
   * @constructor
   */
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

  Gallery.prototype.setCurrentPhotoNumber = function() {
    this.currentPhotoNumber = parseInt(window.location.hash.split('/')[2], 10) - 1;
  };

  Gallery.prototype.getCurrentPhotoNumber = function() {
    return this.currentPhotoNumber;
  };

  /**
  * Функция показа галереи. Устанавливает обработчики
  * на связанные с галереей события
  */
  Gallery.prototype.show = function() {
    document.querySelector('.overlay-gallery').classList.remove('invisible');
    this._closeButton.addEventListener('click', this._onCloseClick);
    this.leftControl.addEventListener('click', this._leftArrow);
    this.rightControl.addEventListener('click', this._rightArrow);
    window.addEventListener('keydown', this._onDocumentKeyDown);
  };

  /**
  * Функция скрытия галереи
  */
  Gallery.prototype.hide = function() {
    document.querySelector('.overlay-gallery').classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
    window.removeEventListener('keydown', this._onDocumentKeyDown);
    window.location.hash = '';
  };

  /**
  * Сохраняет массив картинок
  * @param {Array} arrayPictures
  */
  Gallery.prototype.setPictures = function(arrayPictures) {
    this.arrayPictures = arrayPictures;
  };

  /**
  * Устанавливает хэш к адресу страницы
  * @param {string} hash
  */
  Gallery.prototype.setHash = function(hash) {
    window.location.hash = 'img/screenshots/' + (hash + 1) + '.png';
  };

  /**
  * Устанавливает в галерею картинку с переданным номером
  * @param {number} num
  */
  var lastPicture = '';
  Gallery.prototype.setCurrentPicture = function(num) {
    var preview = document.querySelector('.overlay-gallery-preview');
    if (lastPicture) {
      preview.removeChild(lastPicture);
    }
    if (typeof num === 'string') {
      var picture = new Image();
      picture.height = 300;
      picture.src = window.location.hash.replace('#', '');
      preview.appendChild(picture);
      this.setCurrentPhotoNumber();
      document.querySelector('.preview-number-current').textContent = this.getCurrentPhotoNumber() + 1;
    } else {
      if (num < this.arrayPictures.length) {
        picture = this.arrayPictures[num];
        this.setCurrentPhotoNumber(num);
      }
    }
    lastPicture = picture;
  };

  /**
  * Переключатель левой стрелки
  */
  Gallery.prototype._leftArrow = function() {
    if (this.getCurrentPhotoNumber() > 0) {
      this.setHash(this.getCurrentPhotoNumber() - 1);
    }
  };

  /**
  * Переключатель правой стрелки
  */
  Gallery.prototype._rightArrow = function() {
    if (this.currentPhotoNumber < 9) {
      this.setHash(this.currentPhotoNumber + 1);
    }
  };

  /**
  * Скрытие галереи при нажатии на крестик
  */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  /**
  * Обработчик клавиатурных событий
  * @param {Object} event
  */
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
