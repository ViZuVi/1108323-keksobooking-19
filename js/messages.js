'use strict';

(function () {
  var main = document.querySelector('main');
  var closeMassage = function (massageType) {
    var documentRemoveMessageHandler = function () {
      main.removeChild(massageType);
      document.removeEventListener('keydown', massageEscHandler);
      massageType.removeEventListener('click', documentRemoveMessageHandler);
    };
    var massageEscHandler = function (evt) {
      window.util.isEscEvent(evt, documentRemoveMessageHandler);
    };
    document.addEventListener('keydown', massageEscHandler);
    massageType.addEventListener('click', documentRemoveMessageHandler);
  };

  var showSuccess = function () {
    var successMassageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMassage = successMassageTemplate.cloneNode(true);
    main.appendChild(successMassage);
    closeMassage(successMassage);
    window.form.deactivatePage();
  };

  var showError = function () {
    var errorMassageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMassage = errorMassageTemplate.cloneNode(true);
    main.appendChild(errorMassage);
    closeMassage(errorMassage);
  };

  window.messages = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
