'use strict';

(function () {
  var MAX_PIN_AMOUNT = 5;
  var houseTypeSelect = document.querySelector('#housing-type');

  var filterPins = function (pinsArray) {
    var result = [];
    var i = 0;
    while (i < pinsArray.length && result.length < MAX_PIN_AMOUNT) {
      var pin = pinsArray[i];
      if (filterByType(pin)) {
        result.push(pin);
      }
      i++;
    }
    return result;
  };

  var filterByType = function (pin) {
    return pin.offer.type === houseTypeSelect.value || houseTypeSelect.value === 'any';

  };

  window.filters = {
    filterPins: filterPins
  };

})();
