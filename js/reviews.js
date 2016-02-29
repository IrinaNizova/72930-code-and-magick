/**
 * Created by ira on 02.02.16.
 */
'use strict';

define([
  'review.js'], function(Review) {
  var formFilter = document.querySelector('.reviews-filter');
  formFilter.classList.add('invisible');

  var currentPage = 0;
  /**
   * Количество отзывов на странице
   * @const
   * @type {number}
   */
  var PAGE_SIZE = 3;
  // Путь по которому расположена информация об отзывах
  var jsonPath = '//o0.github.io/assets/json/reviews.json';

  var reviewArticle = document.querySelector('.reviews');
  var filterReviews = [];
  var reviews = [];
  var renderedElements = [];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', jsonPath);
  xhr.timeout = 5000;

  /**
   * Отрисовка страницы с комментариями
   * @param {Object} reviewsList
   * @param {numeric} pageNumber
   * @param {boolean} isRewrite
   */
  function renderReviews(reviewsList, pageNumber, isRewrite) {
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

    renderedElements = renderedElements.concat(pageReviews.map(function(item) {
      var reviewElement = new Review(item);
      reviewElement.render();
      fragment.appendChild(reviewElement.element);
      return reviewElement;
    }));
    list.appendChild(fragment);
  }


  /**
  * Обработчик клика по фильтру
  * @param {ClickEvent} evt
  */
  var filters = document.querySelector('.reviews-filter');
  filters.addEventListener('click', function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.checked === true) {
      setActiveFilter(clickedElement.id);
    }
  });

  // Загрузка прошла удачно
  xhr.onload = function(evt) {
    var rawData = evt.target.response;
    reviews = JSON.parse(rawData);
    reviewArticle.classList.remove('.review-list-loading');
    var activeFilter = localStorage.getItem('activeFilter') || 'reviews-all';
    setActiveFilter(activeFilter);
  };

  // При загрузке произошла ошибка
  xhr.onerror = function() {
    reviewArticle.classList.add('.reviews-load-failure');
  };

  // Загрузка не закончилась до тайм-аута
  xhr.ontimeout = function() {
    reviewArticle.classList.add('.reviews-load-failure');
  };

  // Пока длится загрузка
  xhr.onloadstart = function() {
    reviewArticle.classList.add('.review-list-loading');
  };

  xhr.send();

  formFilter.classList.remove('invisible');


   /**
   * Присваивается активный фильтр
   * @param {string} id
   */
  function setActiveFilter(id) {
    document.querySelector('#' + id).checked = true;
    localStorage.setItem('activeFilter', id);
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
});
