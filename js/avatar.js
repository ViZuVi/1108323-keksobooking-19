'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AD_FORM_PHOTO_WIDTH = 70;
  var AD_FORM_PHOTO_HEIGHT = 70;
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesFileChooser = document.querySelector('#images');
  var adPhotoPreview = document.querySelector('.ad-form__photo');
  var adPhotoContainer = document.querySelector('.ad-form__photo-container');
  var isFirstLoad = true;

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imagesFileChooser.addEventListener('change', function () {
    if (isFirstLoad) {
      adPhotoPreview.remove();
      isFirstLoad = false;
    }
    var adPhoto = document.createElement('img');
    var newPhoto = document.createElement('div');
    adPhoto.style.width = AD_FORM_PHOTO_WIDTH + 'px';
    adPhoto.style.height = AD_FORM_PHOTO_HEIGHT + 'px';
    newPhoto.appendChild(adPhoto);
    adPhotoContainer.appendChild(newPhoto);
    newPhoto.classList.add('ad-form__photo');
    var file = imagesFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        adPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var clearUserPhoto = function () {
    avatarPreview.src = DEFAULT_AVATAR;
  };

  var clearHousePhotos = function () {
    var adPhotoCollection = document.querySelectorAll('.ad-form__photo');
    adPhotoCollection.forEach(function (photo) {
      photo.remove();
    });
    var defaultAdPhoto = document.createElement('div');
    defaultAdPhoto.classList.add('ad-form__photo');
    if (!isFirstLoad) {
      adPhotoContainer.appendChild(defaultAdPhoto);
      isFirstLoad = true;
    }
  };

  window.avatar = {
    clearUserPhoto: clearUserPhoto,
    clearHousePhotos: clearHousePhotos
  };
})();
