'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var WIZARD_LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var WIZARD_COATS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var WIZARD_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var WIZARD_FIREBALL = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var DEFAULT_WIZARDS_LENGTH = 3;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateDefaultWizards = function () {
  var defaultWizardsArray = [];

  for (var i = 0; i <= DEFAULT_WIZARDS_LENGTH; i++) {
    defaultWizardsArray.push({
      name: WIZARD_NAMES[generateRandomNumber(0, WIZARD_NAMES.length - 1)] +
        ' ' + WIZARD_LASTNAMES[generateRandomNumber(0, WIZARD_LASTNAMES.length - 1)],
      coatColor: WIZARD_COATS[generateRandomNumber(0, WIZARD_COATS.length - 1)],
      eyesColor: WIZARD_EYES[generateRandomNumber(0, WIZARD_EYES.length - 1)],
    });
  }

  return defaultWizardsArray;
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                              .content
                              .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilar = function () {
  var defaultWizards = generateDefaultWizards();
  var fragment = document.createDocumentFragment();
  var similarListElement = setupBlock.querySelector('.setup-similar-list');

  for (var i = 0; i < defaultWizards.length; i++) {
    fragment.appendChild(renderWizard(defaultWizards[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
};

var initWizardSetup = function () {
  var setupBlockOpen = document.querySelector('.setup-open');
  var setupBlockClose = document.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (evt.currentTarget.classList.contains('setup-open')) {
        openPopup();
      }

      if (evt.currentTarget.classList.contains('setup-close')) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupBlockOpen.addEventListener('click', openPopup);
  setupBlockOpen.addEventListener('keydown', onPopupEnterPress);
  setupBlockClose.addEventListener('click', closePopup);
  setupBlockClose.addEventListener('keydown', onPopupEnterPress);

  var wizardCoatElement = setupBlock.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInput = setupBlock.querySelector('input[name="coat-color"]');
  var wizardEyesElement = setupBlock.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = setupBlock.querySelector('input[name="eyes-color"]');
  var wizardFireballElement = setupBlock.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupBlock.querySelector('input[name="fireball-color"]');

  var convertFireballColor = function (rgb) {
    var hexColor;

    function hex(x) {
      return ('0' + parseInt(x, 10).toString(16)).slice(-2);
    }

    if (rgb) {
      var rgbColor = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      hexColor = '#' + hex(rgbColor[1]) + hex(rgbColor[2]) + hex(rgbColor[3]);
    } else {
      hexColor = WIZARD_FIREBALL[generateRandomNumber(0, WIZARD_FIREBALL.length - 1)];
    }

    return hexColor;
  };

  var generateColor = function (colorsArray, currentColor) {
    var color = colorsArray[generateRandomNumber(0, colorsArray.length - 1)];

    while (color === currentColor) {
      color = colorsArray[generateRandomNumber(0, colorsArray.length - 1)];
    }

    return color;
  };

  var onWizardCoatClick = function () {
    var coatColor = generateColor(WIZARD_COATS, wizardCoatElement.style.fill);

    wizardCoatElement.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  };

  var onWizardEyesClick = function () {
    var eyesColor = generateColor(WIZARD_EYES, wizardEyesElement.style.fill);

    wizardEyesElement.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  };

  var onWizardFireballClick = function () {
    var fireballColor = generateColor(WIZARD_FIREBALL, convertFireballColor(wizardFireballElement.style.backgroundColor));

    wizardFireballElement.style.backgroundColor = fireballColor;
    wizardFireballInput.value = fireballColor;
  };

  wizardCoatElement.addEventListener('click', onWizardCoatClick);
  wizardEyesElement.addEventListener('click', onWizardEyesClick);
  wizardFireballElement.addEventListener('click', onWizardFireballClick);
};

var setupBlock = document.querySelector('.setup');

renderSimilar();
initWizardSetup();
