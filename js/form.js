'use strict';
/*  global docCookies: true  */

define(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formAddComment = document.querySelector('.review-submit');
  var form = document.querySelector('.overlay');

  var marks = form['review-mark'];
  var name = document.querySelector('.review-form-field-name');
  var text = document.querySelector('.review-form-field-text');
  var submit = document.querySelector('.review-submit');

  var labelsContainer = document.querySelector('.review-fields');
  var nameLabel = document.querySelector('.review-fields-name');
  var textLabel = document.querySelector('.review-fields-text');

   /**
   * Обработчик события клика по кнопке, открывающей форму отзыва
   * @param {ClickEvent} evt
   */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    if (docCookies.getItem('mark') !== null) {
      marks[docCookies.getItem('mark') - 1].setAttribute('checked', true);
      name.value = docCookies.getItem('name');
    }
    checkFormFields();
  };

  /**
   * Обработчик события клика по кнопке, закрывающей форму отзыва
   * @param {ClickEvent} evt
   */
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /**
   * Обработчик события клика по кнопке добавления отзыва
   * @param {ClickEvent} evt
   */
  formAddComment.onclick = function() {
    var dateToExpire = getCookieDate();
    docCookies.setItem('name', name.value, dateToExpire);
    docCookies.setItem('mark', getMark(), dateToExpire);
  };

  /**
   * Смотрим какая оценка на форме выделена и возващаем её значение.
   * @return {numeric}
   */
  function getMark() {
    for (var i = 0; i < 5; i++) {
      if (marks[i].checked === true) {
        return i + 1;
      }
    }
  }

   /**
   * Возвращаем дату до дня рождения, нужную для куки
   * @return {numeric}
   */
  function getCookieDate() {
    var date = new Date();
    var birthday = new Date(date.getFullYear(), 10, 12);
    if (date < birthday) {
      birthday.setFullYear(date.getFullYear() - 1);
    }
    var dt = date - birthday;
    date.setDate(Math.round(dt / 24 / 60 / 60 / 1000));
    return date;
  }

  /**
   * Проверяем все ли обязательные поля формы заполнены
   */
  function checkFormFields() {
    if (name.value === '') {
      nameLabel.classList.remove('invisible');
    } else {
      nameLabel.classList.add('invisible');
    }

    textLabel.classList.add('invisible');

    var mark = getMark();
    if (mark < 3) {
      if (textLabel.control.value === '') {
        textLabel.classList.remove('invisible');
      }
    }


    if (textLabel.classList.contains('invisible') && nameLabel.classList.contains('invisible')) {
      labelsContainer.classList.add('invisible');
      submit.removeAttribute('disabled');
    } else {
      labelsContainer.classList.remove('invisible');
      submit.setAttribute('disabled', true);
    }
  }

  for (var i = 0; i < 5; i++) {
    marks[i].onchange = function() {
      checkFormFields();
    };
  }

  // Событие изменения текста в поле Имя
  name.onchange = function() {
    checkFormFields();
  };

  // Событие изменения текста в поле Текст
  text.onchange = function() {
    checkFormFields();
  };
});
