'use strict';

(function () {
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var adFormSubmit = document.querySelector('.ad-form__submit');

  var formfieldsValidate = function () {
    if (Number(roomNumberInput.value) === 100 && Number(capacityInput.value) !== 0) {
      capacityInput.setCustomValidity('100 комнат не предназначены для размещения гостей');
    } else if (capacityInput.value > roomNumberInput.value) {
      capacityInput.setCustomValidity('Количество гостей не должно превышать количество комнат!');
    } else {
      capacityInput.setCustomValidity('');
    }
  };

  var HousingPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var priceInputsCheck = function (evt) {
    priceInput.setAttribute('min', HousingPrices[evt.currentTarget.value]);
    priceInput.setAttribute('placeholder', HousingPrices[evt.currentTarget.value]);
  };

  typeInput.addEventListener('change', priceInputsCheck);

  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  var setEqualTimeIn = function () {
    timeoutSelect.value = timeinSelect.value;
  };

  var setEqualTimeOut = function () {
    timeinSelect.value = timeoutSelect.value;
  };

  timeinSelect.addEventListener('change', setEqualTimeIn);
  timeoutSelect.addEventListener('change', setEqualTimeOut);

  adFormSubmit.addEventListener('click', formfieldsValidate);
})();
