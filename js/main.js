'use strict'

var createSimilarAd = function () {
  var similarAds = [];
  for (var i = 0; i < 8; i++) {
    var similarAd = {
      "author": {
        "avatar":  img/avatars/user02.png,
        },
    }
    similarAds.push(similarAd);
  }
};
console.log(createSimilarAd())
