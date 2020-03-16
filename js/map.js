'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var renderPin = function (ad) {
    var similarAdElement = similarAdTemplate.cloneNode(true);
    similarAdElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    similarAdElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    similarAdElement.querySelector('img').src = ad.author.avatar;
    similarAdElement.querySelector('img').alt = ad.offer.title;

    var showCard = function () {
      if (map.querySelector('.map__card')) {
        map.removeChild(map.querySelector('.map__card'));
      }
      map.insertBefore(window.card.renderOffer(ad), mapFiltersContainer);
      var closeAdCardBtn = map.querySelector('.popup__close');

      var closeCard = function () {
        var mapCard = map.querySelector('.map__card');
        map.removeChild(mapCard);
        document.removeEventListener('keydown', cardKeydownHandler);
      };

      closeAdCardBtn.addEventListener('click', closeCard);

      var cardKeydownHandler = function (evt) {
        window.util.isEscEvent(evt, closeCard);
      };

      document.addEventListener('keydown', cardKeydownHandler);
    };

    similarAdElement.addEventListener('click', showCard);

    return similarAdElement;
  };

  var drewAds = function (serverAds) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < serverAds.length; i++) {
      fragment.appendChild(renderPin(serverAds[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var init = function () {
    map.classList.remove('map--faded');
    window.backend.getData(drewAds, window.massages.showError);
  };

  window.map = {
    init: init
  };
})();
