'use strict';

(function () {
  var MapPinStyle = {
    TOP: 375,
    LEFT: 570
  };
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var filterFeaturesContainer = mapFilters.querySelectorAll('select, fieldset');

  var mainPinCliclHandler = function () {
    if (event.which === 1) {
      activateForm();
    }
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var deactivatePage = function () {
    formFieldsets.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });
    filterFeaturesContainer.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });
    mapFilters.reset();
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    deletePins();
    map.classList.add('map--faded');
    window.avatar.clearUserPhoto();
    window.avatar.clearHousePhotos();
    var mapPinMain = mapPins.querySelector('.map__pin--main');
    mapPinMain.style.left = MapPinStyle.LEFT + 'px';
    mapPinMain.style.top = MapPinStyle.TOP + 'px';

    mainMapPin.addEventListener('mousedown', mainPinCliclHandler);
  };

  var resetBtn = document.querySelector('.ad-form__reset');

  resetBtn.addEventListener('click', deactivatePage);

  deactivatePage();

  var activateForm = function () {
    formFieldsets.forEach(function (input) {
      input.removeAttribute('disabled');
    });
    filterFeaturesContainer.forEach(function (input) {
      input.removeAttribute('disabled');
    });
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
    window.backend.sendData(new FormData(adForm), window.messages.showSuccess, window.messages.showError);
    evt.preventDefault();
  });

  window.form = {
    deactivatePage: deactivatePage,
    deletePins: deletePins
  };
})();
