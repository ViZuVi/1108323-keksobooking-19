'use strict'

var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var createSimilarAd = function () {
  var similarAds = [];
  var avatars = ['./img/avatars/user01.png', './img/avatars/user02.png', './img/avatars/user03.png', './img/avatars/user04.png', './img/avatars/user05.png', './img/avatars/user06.png', './img/avatars/user07.png', './img/avatars/user08.png'];
  var typeOfHousing = ['palace', 'flat', 'house', 'bungalo'];
  var checkinAndcheckout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  for (var i = 0; i < 8; i++) {
      var similarAd = {
      author: {
        avatar:  avatars[i],
        },

      offer: {
        title: 'Ea aute culpa ex excepteur cupidatat Lorem ipsum anim pariatur anim consectetur.',
        address: '600, 350',
        price: getRandomNumber(0, 1000000),
        type: typeOfHousing[getRandomNumber(0, 3)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: checkinAndcheckout[getRandomNumber(0, 2)],
        checkout: checkinAndcheckout[getRandomNumber(0, 2)],
        features: features[getRandomNumber(0, 5)], // необходимо сделать так, чтобы генерировался массив случайной длиниы
        description: 'Reprehenderit et quis amet ipsum do tempor aliquip esse pariatur.Voluptate minim laboris fugiat officia cupidatat incididunt non occaecat ad aute dolor sint labore velit. Eu officia ut et culpa irure commodo ipsum laborum elit eiusmod. Et aliquip tempor velit id laborum irure. Tempor incididunt aliqua laboris ut dolor commodo enim fugiat est mollit. Aute do adipisicing in sit reprehenderit amet ex ullamco esse est laborum Lorem. Proident magna do eu dolor voluptate ut pariatur reprehenderit cupidatat Lorem eiusmod.',
        photos: photos[i]
      },

      location: {
        x: Math.round(getRandomNumber(0, 1200)), // нужно ограничить координату размерами блока карты
        y: Math.round(getRandomNumber(130, 630))
      }
    };
    similarAds.push(similarAd);
  }
  return similarAds;
};

var renderAd = function (ad) {
  var similarAdElement = similarAdTemplate.cloneNode(true);
  similarAdElement.style.left = ad.location.x + 'px';
  similarAdElement.style.top = ad.location.y + 'px';
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
}

var init = function () {
  map.classList.remove('map--faded');
  drewAds();
};

init();
