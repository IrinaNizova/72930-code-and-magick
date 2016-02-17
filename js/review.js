/**
 * Created by ira on 13.02.16.
 */


'use strict';

(function() {
    /**
     * @constructor
     */
  var Review = function(data) {
    this._data = data;
  };

  Review.prototype._data = null;

  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');
    var reviewArticle = document.querySelector('.reviews');
    this.element = 'content' in template ?
      template.content.children[0].cloneNode(true) :
      template.children[0].cloneNode(true);
    this.element = template.content.children[0].cloneNode(true);
    this.element.querySelector('.review-text').textContent = this._data['description'];
    this.rating = this.element.querySelector('.review-rating');
    var starClassName = ['', 'review-rating', 'review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
    this.rating.classList.add(starClassName[this._data['rating']]);

    var img = new Image(124, 124);
    img.src = this._data['author']['picture'];
    var imgTag = this.element.querySelector('.review-author');
    img.onload = function() {
      imgTag.style.backgroundImage = 'url(\'' + img.src + '\')';
    };
    img.onerror = function() {
      reviewArticle.classList.add('.review-load-failure');
    };
  };
  window.Review = Review;

})();
