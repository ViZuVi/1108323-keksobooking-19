'use strict';

var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_AND_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ANOUNT_OF_SIMILAR_ADS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateFeaturesArray = function () {
  var featuresCollection = [];
  var featuresArrayLength = getRandomNumber(1, 6);
  for (var i = 0; i <= featuresArrayLength; i++) {
    var randomFeature = FEATURES[getRandomNumber(0, 5)];
    featuresCollection.push(randomFeature);
  }
  return featuresCollection;
};

var createSimilarAd = function () {
  var similarAds = [];
  var mapOffstWidth = document.querySelector('.map').offsetWidth;
  for (var i = 1; i <= ANOUNT_OF_SIMILAR_ADS; i++) {
    var similarAd = {
      author: {
        avatar: './img/avatars/user0' + i + '.png',
      },

      offer: {
        title: 'Ea aute culpa ex excepteur cupidatat Lorem ipsum anim pariatur anim consectetur.',
        address: '600, 350',
        price: getRandomNumber(0, 1000000),
        type: TYPE_OF_HOUSING[getRandomNumber(0, 3)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: CHECKIN_AND_CHECKOUT[getRandomNumber(0, 2)],
        checkout: CHECKIN_AND_CHECKOUT[getRandomNumber(0, 2)],
        features: generateFeaturesArray(),
        description: 'Reprehenderit et quis amet ipsum do tempor aliquip esse pariatur.Voluptate minim laboris fugiat officia cupidatat incididunt non occaecat ad aute dolor sint labore velit. Eu officia ut et culpa irure commodo ipsum laborum elit eiusmod. Et aliquip tempor velit id laborum irure. Tempor incididunt aliqua laboris ut dolor commodo enim fugiat est mollit. Aute do adipisicing in sit reprehenderit amet ex ullamco esse est laborum Lorem. Proident magna do eu dolor voluptate ut pariatur reprehenderit cupidatat Lorem eiusmod.',
        photos: PHOTOS[i]
      },

      location: {
        x: Math.round(getRandomNumber(0, mapOffstWidth)),
        y: Math.round(getRandomNumber(130, 630))
      }
    };
    similarAds.push(similarAd);
  }
  return similarAds;
};

var renderAd = function (ad) {
  var similarAdElement = similarAdTemplate.cloneNode(true);
  similarAdElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  similarAdElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  similarAdElement.querySelector('img').src = ad.author.avatar;
  similarAdElement.querySelector('img').alt = ad.offer.title;

  return similarAdElement;
};

var drewAds = function () {
  var fragment = document.createDocumentFragment();
  var Ads = createSimilarAd();
  for (var i = 0; i < Ads.length; i++) {
    fragment.appendChild(renderAd(Ads[i]));
  }
  similarListElement.appendChild(fragment);
};

var init = function () {
  map.classList.remove('map--faded');
  drewAds();
};

init();
