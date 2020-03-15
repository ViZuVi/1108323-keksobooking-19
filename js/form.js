'use strict';

(function () {
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var deactivateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  deactivateForm();

  var activateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
    adForm.classList.remove('ad-form--disabled');
    window.map.init();
    setCurrentAddress();
    mainMapPin.removeEventListener('mousedown', mainPinCliclHandler);
  };

  var mainPinCliclHandler = function () {
    if (event.which === 1) {
      activateForm();
    }
  };

  mainMapPin.addEventListener('mousedown', mainPinCliclHandler);

  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateForm);
  });

  var setCurrentAddress = function () {
    var addressCoordinates = mainMapPin.getBoundingClientRect();
    var addressXCoordinate = Math.round(addressCoordinates.x + addressCoordinates.width / 2);
    var addressYCoordinate = Math.round(addressCoordinates.y + addressCoordinates.height / 2);
    addressInput.value = addressXCoordinate + ', ' + addressYCoordinate;
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(adForm), window.backend.showSuccessMassage, window.backend.showErrorMassage);
    evt.preventDefault();
  });
})();
