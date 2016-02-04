/**
 * Created by ira on 02.02.16.
 */
'use strict';
/* global reviews */

(function() {
  var formFilter = document.querySelector('.reviews-filter');
  formFilter.classList.add('invisible');

  var template = document.querySelector('#review-template');
	reviews.forEach(function(item, index, array) {
	  var element = template.content.children[0].cloneNode(true);
	  element.querySelector('.review-text').textContent = item['description'];

	  var img = new Image(124, 124);
      img.src = item["author"]["picture"];
	  img.onload = function() {
		var rating = element.querySelector('.review-rating');
		element.removeChild(rating);
	    element.querySelector('.review-author').style.backgroundImage = 'url(\'' + img.src + '\')';
	  };
	  img.onerror = function() {
	    var reviewArticle = document.querySelector('.review');
		reviewArticle.classList.add('.review-load-failure');
	  }

	  var list = document.querySelector('.reviews-list');
	  list.appendChild(element);
	 });

	formFilter.classList.remove('invisible');
})();