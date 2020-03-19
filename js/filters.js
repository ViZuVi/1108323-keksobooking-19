'use strict';

(function () {
  var MAX_PIN_AMOUNT = 5;
  var houseTypeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var featuresSelect = document.querySelectorAll('input[name=features]');

  var showPins = function (pinsArray) {
    var result = [];
    var i = 0;
    while (i < pinsArray.length && result.length < MAX_PIN_AMOUNT) {
      var pin = pinsArray[i];
      if (filterByType(pin) && filterByPrice(pin) && filterByRoomsNumber(pin) && filterByGuestsNumber(pin) && filterByFeatures(pin)) {
        result.push(pin);
      }
      i++;
    }
    return result;
  };

  var filterByType = function (pin) {
    return pin.offer.type === houseTypeSelect.value || houseTypeSelect.value === 'any';
  };

  var filterByPrice = function (pin) {
    switch (priceSelect.value) {
      case 'low':
        return pin.offer.price < 10000;
      case 'middle':
        return pin.offer.price > 10000 && pin.offer.price < 50000;
      case 'high':
        return pin.offer.price > 50000;
      default:
        return true;
    }
  };

  var filterByRoomsNumber = function (pin) {
    return pin.offer.rooms === Number(roomsSelect.value) || roomsSelect.value === 'any';
  };

  var filterByGuestsNumber = function (pin) {
    return pin.offer.guests === Number(guestsSelect.value) || guestsSelect.value === 'any';
  };

  var filterByFeatures = function (pin) {
    return Array.from(featuresSelect).filter(function (checkbox) {
      return checkbox.checked;
    }).every(function (checkbox) {
      return pin.offer.features.some(function (feature) {
        return feature === checkbox.value;
      });
    });
  };

  window.filters = {
    showPins: showPins
  };

})();
