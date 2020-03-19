'use strict';

(function () {
  var Key = {
    ENTER: 13,
    ESC: 27
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Key.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Key.ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
