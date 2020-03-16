'use strict';

(function () {
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var mainPinCliclHandler = function () {
    if (event.which === 1) {
      activateForm();
    }
  };

  var deactivateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
    var MapPinStyle = {
      TOP: 375,
      LEFT: 570
    };
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPins = document.querySelector('.map__pins');
    pins.forEach(function (element) {
      mapPins.removeChild(element);
    });
    map.classList.add('map--faded');
    var mapPinMain = mapPins.querySelector('.map__pin--main');
    mapPinMain.style.left = MapPinStyle.LEFT + 'px';
    mapPinMain.style.top = MapPinStyle.TOP + 'px';

    mainMapPin.addEventListener('mousedown', mainPinCliclHandler);
  };

  var resetBtn = document.querySelector('.ad-form__reset');

  resetBtn.addEventListener('click', deactivateForm);

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
    window.backend.sendData(new FormData(adForm), window.massages.showSuccess, window.massages.showError);
    evt.preventDefault();
  });

  window.form = {
    deactivateForm: deactivateForm
  };
})();
