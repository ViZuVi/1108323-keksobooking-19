'use strict';

(function () {
  var main = document.querySelector('main');
  var URL = {
    GET: 'https://js.dump.academy/keksobooking/data',
    SEND: 'https://js.dump.academy/keksobookin'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var closeMassage = function (massageType) {
    var removeMassage = function () {
      main.removeChild(massageType);
      document.removeEventListener('keydown', massageEscHandler);
      document.removeEventListener('click', removeMassage);
    };
    var massageEscHandler = function (evt) {
      window.util.isEscEvent(evt, removeMassage);
    };
    document.addEventListener('keydown', massageEscHandler);
    document.addEventListener('click', removeMassage);
  };

  var showSuccessMassage = function () {
    var successMassageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMassage = successMassageTemplate.cloneNode(true);
    main.appendChild(successMassage);
    closeMassage(successMassage);
  };


  var showErrorMassage = function () {
    var errorMassageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMassage = errorMassageTemplate.cloneNode(true);
    main.appendChild(errorMassage);

    closeMassage(errorMassage);
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS; // 10s

    return xhr;
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL.SEND);
    xhr.send(data, showSuccessMassage, showErrorMassage);
  };

  var getData = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL.GET);
    xhr.send();
  };

  window.backend = {
    getData: getData,
    sendData: sendData,
    showSuccessMassage: showSuccessMassage,
    showErrorMassage: showErrorMassage
  };
})();
