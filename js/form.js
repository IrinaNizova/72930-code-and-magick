'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.overlay');

  var marks = form['review-mark'];
  var name = document.querySelector('.review-form-field-name');
  var text = document.querySelector('.review-form-field-text');
  var submit = document.querySelector('.review-submit');

  var labelsContainer = document.querySelector('.review-fields');
  var nameLabel = document.querySelector('.review-fields-name');
  var textLabel = document.querySelector('.review-fields-text');

  onload = function() {
    checkFormFields();
  }

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function getMark() {
    for (var i = 0; i < 5; i++){
      if (marks[i].checked === true) {
        return i+1;
	  }
	}
  }


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
      }
    }

  name.onchange = function() {
    checkFormFields();
  };

  text.onchange = function() {
    checkFormFields();
  };
})();
