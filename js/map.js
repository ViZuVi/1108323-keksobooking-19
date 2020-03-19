'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var pinsData = [];

  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var closeCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
      document.removeEventListener('keydown', cardKeydownHandler);
    }
  };

  var cardKeydownHandler = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var showCard = function (ad) {
    if (map.querySelector('.map__card')) {
      map.removeChild(map.querySelector('.map__card'));
    }
    map.insertBefore(window.card.renderOffer(ad), mapFiltersContainer);
    var closeAdCardBtn = map.querySelector('.popup__close');
    closeAdCardBtn.addEventListener('click', closeCard);

    document.addEventListener('keydown', cardKeydownHandler);
  };

  var renderPin = function (ad) {
    var similarAdElement = similarAdTemplate.cloneNode(true);
    similarAdElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    similarAdElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    similarAdElement.querySelector('img').src = ad.author.avatar;
    similarAdElement.querySelector('img').alt = ad.offer.title;

    similarAdElement.addEventListener('click', showCard.bind(null, ad));

    return similarAdElement;
  };

  var drewAds = function () {
    var filteredAds = window.filters.showPins(pinsData);
    var fragment = document.createDocumentFragment();
    window.form.deletePins();
    closeCard();
    filteredAds.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });
    similarListElement.appendChild(fragment);
  };

  var init = function () {
    map.classList.remove('map--faded');
    window.backend.getData(function (pins) {
      pinsData = pins;
      drewAds();
    }, window.messages.showError);
  };

  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', window.optimize.debounce(drewAds));

  window.map = {
    init: init
  };
})();
