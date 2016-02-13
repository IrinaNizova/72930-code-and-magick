/**
 * Created by ira on 02.02.16.
 */
'use strict';

(function() {
  var formFilter = document.querySelector('.reviews-filter');
  formFilter.classList.add('invisible');

  var currentPage = 0;
  var PAGE_SIZE = 3;
  var jsonPath = '//o0.github.io/assets/json/reviews.json';

  var reviewArticle = document.querySelector('.reviews');
  var filterReviews = [];
  var reviews = [];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', jsonPath);
  xhr.timeout = 5000;

  function renderReviews(reviewsList, pageNumber, isRewrite) {
    var template = document.querySelector('#review-template');
    var list = document.querySelector('.reviews-list');
    var fragment = document.createDocumentFragment();
    var from = PAGE_SIZE * pageNumber;
    var to = from + PAGE_SIZE;

    var moreReviewsButton = document.querySelector('.reviews-controls-more');
    if (to < reviewsList.length) {
      moreReviewsButton.classList.remove('invisible');
    } else {
      moreReviewsButton.classList.add('invisible');
    }
    var pageReviews = reviewsList.slice(from, to);

    if (isRewrite === true) {
      list.innerHTML = '';
    }

    moreReviewsButton.onclick = function() {
      renderReviews(reviewsList, ++currentPage, false);
    };

    pageReviews.forEach(function(item) {
      var element = template.content.children[0].cloneNode(true);
      element.querySelector('.review-text').textContent = item['description'];
      var rating = element.querySelector('.review-rating');
      rating.setAttribute('style', 'width:' + 30 * item['rating'] + 'px;');
      var img = new Image(124, 124);
      img.src = item['author']['picture'];
      img.onload = function() {
        element.querySelector('.review-author').style.backgroundImage = 'url(\'' + img.src + '\')';
      };
      img.onerror = function() {
        reviewArticle.classList.add('.review-load-failure');
      };
      fragment.appendChild(element);
    });
    list.appendChild(fragment);
  }

  var filters = document.querySelector('.reviews-filter');
  filters.addEventListener('click', function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.checked === true) {
      setActiveFilter(clickedElement.id);
    }
  });

  xhr.onload = function(evt) {
    var rawData = evt.target.response;
    reviews = JSON.parse(rawData);
    reviewArticle.classList.remove('.review-list-loading');
    var fieldset = document.querySelector('.reviews-filter');
    for (var i = 0; i < 5; i++) {
      if (fieldset[i].checked === true) {
        setActiveFilter(fieldset[i].id);
      }
    }
  };

  xhr.onerror = function() {
    reviewArticle.classList.add('.reviews-load-failure');
  };

  xhr.ontimeout = function() {
    reviewArticle.classList.add('.reviews-load-failure');
  };

  xhr.onloadstart = function() {
    reviewArticle.classList.add('.review-list-loading');
  };

  xhr.send();

  formFilter.classList.remove('invisible');

  function setActiveFilter(id) {

    document.querySelector('#' + id).checked = true;
    currentPage = 0;
    filterReviews = reviews.slice(0);
    switch (id) {
      case 'reviews-recent':
        filterReviews = filterReviews.sort(function(a, b) {
          return new Date(b['date']) - new Date(a['date']);
        });
        break;
      case 'reviews-good':
        filterReviews = filterReviews.sort(function(a, b) {
          return b['rating'] - a['rating'];
        }).filter(function(item) {
          return item['rating'] >= 3;
        });
        break;
      case 'reviews-bad':
        filterReviews = filterReviews.sort(function(a, b) {
          return a['rating'] - b['rating'];
        }).filter(function(item) {
          return item['rating'] < 3;
        });
        break;
      case 'reviews-popular':
        filterReviews = filterReviews.sort(function(a, b) {
          return b['review_usefulness'] - a['review_usefulness'];
        });
        break;
    }
    renderReviews(filterReviews, 0, true);
  }
})();
