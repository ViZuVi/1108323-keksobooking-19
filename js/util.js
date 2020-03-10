'use strict';

(function () {
  var keyes = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === keyes.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === keyes.ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
