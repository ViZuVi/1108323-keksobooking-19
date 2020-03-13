'use strict';

(function () {
  var MAX_MAP_Y = 630;
  var MIN_MAP_Y = 130;
  var map = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var setPinPosition = function (left, top) {
    mainMapPin.style.top = top - mainMapPin.offsetHeight + 'px';
    mainMapPin.style.left = left - mainMapPin.offsetWidth / 2 + 'px';
  };

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    mainMapPin.removeEventListener('click', onClickPreventDefault);
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var mapCoordinates = map.getBoundingClientRect();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var addressYCoordinates = Math.min(MAX_MAP_Y, Math.max(moveEvt.pageY - mapCoordinates.top, MIN_MAP_Y));
      var addressXCoordinates = Math.min(mapCoordinates.width, Math.max(moveEvt.pageX - mapCoordinates.left, 0));
      setPinPosition(addressXCoordinates, addressYCoordinates);
      addressInput.value = addressXCoordinates + ', ' + addressYCoordinates;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      mainMapPin.addEventListener('click', onClickPreventDefault);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
