'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');

  var successHandler = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, window.util.commonErrorHandler);
    evt.preventDefault();
  });
})();
