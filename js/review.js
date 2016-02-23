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

  var template = document.querySelector('#review-template');
  var reviewArticle = document.querySelector('.reviews');
  var starClassName = ['', 'review-rating', 'review-rating-two',
		'review-rating-three', 'review-rating-four', 'review-rating-five'];

  Review.prototype.render = function() {
    this.element = 'content' in template ?
      template.content.children[0].cloneNode(true) :
      template.children[0].cloneNode(true);
    this.element = template.content.children[0].cloneNode(true);
    this.element.querySelector('.review-text').textContent = this._data['description'];
    this.rating = this.element.querySelector('.review-rating');
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

    var yesButton = this.element.querySelector('.review-quiz-answer-yes');
    function add() {
      this._data['rating'] += 1;
    }
    var addRating = add.bind(this);
    yesButton.onclick = addRating;

    var noButton = this.element.querySelector('.review-quiz-answer-no');
    function reduce() {
      this._data['rating'] -= 1;
    }
    var reduceRating = reduce.bind(this);
    noButton.onclick = reduceRating;
  };
  window.Review = Review;

})();
