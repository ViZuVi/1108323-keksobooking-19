'use strict';

(function () {
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var apartmentTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var featureTypes = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };

  window.card = {
    renderOffer: function (ad) {
      var similarCardElement = adCardTemplate.cloneNode(true);
      similarCardElement.querySelector('.popup__title').textContent = ad.offer.title;
      similarCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
      similarCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      similarCardElement.querySelector('.popup__type').textContent = apartmentTypes[ad.offer.type];
      similarCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      similarCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

      // ----------create featuresFragment-----------
      var adFeaturesListTemplate = similarCardElement.querySelector('.popup__features');
      var featuresFragment = document.createDocumentFragment();
      var featureItems = ad.offer.features;
      adFeaturesListTemplate.innerHTML = '';
      for (var j = 0; j < featureItems.length; j++) {
        var newFeature = document.createElement('li');
        newFeature.className = 'popup__feature ' + featureTypes[featureItems[j]];
        featuresFragment.appendChild(newFeature);
      }
      adFeaturesListTemplate.appendChild(featuresFragment);
      // -------------------------------------------

      similarCardElement.querySelector('.popup__description').textContent = ad.offer.description;

      // ----------create photosFragment-----------
      var adPhotosTemplate = similarCardElement.querySelector('.popup__photos');
      var photoItems = ad.offer.photos;
      var photosFragment = document.createDocumentFragment();
      for (var i = 0; i < photoItems.length; i++) {
        var newPhoto = adPhotosTemplate.children[0].cloneNode(true);
        newPhoto.src = photoItems[i];
        photosFragment.appendChild(newPhoto);
      }
      adPhotosTemplate.innerHTML = '';
      adPhotosTemplate.appendChild(photosFragment);
      // -------------------------------------------

      similarCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

      return similarCardElement;
    }
  };
})();
