'use strict';

(function () {
  var mapOffstWidth = document.querySelector('.map').offsetWidth;
  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoordsY = mainMapPin.offsetTop - shift.y;
      mainMapPin.style.top = Math.min(630, Math.max(newCoordsY, 130)) + 'px';

      var newCoordsX = mainMapPin.offsetLeft - shift.x;
      mainMapPin.style.left = Math.min(mapOffstWidth, Math.max(newCoordsX, 0)) + 'px';

      var addressCoordinates = mainMapPin.getBoundingClientRect();
      var addressYCoordinate = Math.round(mainMapPin.offsetTop - shift.y + addressCoordinates.height / 2);
      var addressXCoordinate = Math.round(mainMapPin.offsetLeft - shift.x + addressCoordinates.width / 2);
      var addressInput = document.querySelector('#address');
      addressInput.value = addressXCoordinate + ', ' + addressYCoordinate;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainMapPin.removeEventListener('click', onClickPreventDefault);
        };
        mainMapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
