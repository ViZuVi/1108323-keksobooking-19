'use strict';

(function () {
  var main = document.querySelector('main');
  var closeMassage = function (massageType) {
    var removeMassage = function () {
      main.removeChild(massageType);
      document.removeEventListener('keydown', massageEscHandler);
      document.removeEventListener('click', removeMassage);
    };
    var massageEscHandler = function (evt) {
      window.util.isEscEvent(evt, removeMassage);
    };
    document.addEventListener('keydown', massageEscHandler);
    document.addEventListener('click', removeMassage);
  };

  var showSuccess = function () {
    var successMassageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMassage = successMassageTemplate.cloneNode(true);
    main.appendChild(successMassage);
    closeMassage(successMassage);
    window.form.deactivateForm();
  };

  var showError = function () {
    var errorMassageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMassage = errorMassageTemplate.cloneNode(true);
    main.appendChild(errorMassage);
    closeMassage(errorMassage);
  };

  window.massages = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
