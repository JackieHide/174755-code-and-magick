'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.setAttribute('style', '');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.setAttribute('style', '');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSetupOpenClick = openPopup;
  var onSetupCloseClick = closePopup;

  var onSetupOpenEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var onSetupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);

  // dialog drag
  var initDialogDrag = function () {
    var setupDialogElement = document.querySelector('.setup');
    var dialogHandler = setupDialogElement.querySelector('.upload');

    dialogHandler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
        setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (event) {
            event.preventDefault();
            dialogHandler.removeEventListener('click', onClickPreventDefault);
          };
          dialogHandler.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  initDialogDrag();
})();
