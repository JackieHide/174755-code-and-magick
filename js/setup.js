'use strict';
(function () {
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

  // генерирует массив объектов волшебников
  var generateDefaultWizards = function () {
    var defaultWizardsArray = [];

    for (var i = 0; i <= DEFAULT_WIZARDS_LENGTH; i++) {
      defaultWizardsArray.push({
        name: WIZARD_NAMES[window.util.generateRandomNumber(0, WIZARD_NAMES.length - 1)] +
          ' ' + WIZARD_LASTNAMES[window.util.generateRandomNumber(0, WIZARD_LASTNAMES.length - 1)],
        coatColor: WIZARD_COATS[window.util.generateRandomNumber(0, WIZARD_COATS.length - 1)],
        eyesColor: WIZARD_EYES[window.util.generateRandomNumber(0, WIZARD_EYES.length - 1)],
      });
    }

    return defaultWizardsArray;
  };

  // создает волшебника в "Похожих персонажах"
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

  // создает четырех волшебников в "Похожих персонажах"
  var renderSimilar = function () {
    var defaultWizards = generateDefaultWizards();
    var fragment = document.createDocumentFragment();
    var similarListElement = setup.querySelector('.setup-similar-list');

    for (var i = 0; i < defaultWizards.length; i++) {
      fragment.appendChild(renderWizard(defaultWizards[i]));
    }

    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  // события для кастомизации персонажа
  var initWizardSetup = function () {
    var wizardCoatElement = setup.querySelector('.setup-wizard .wizard-coat');
    var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
    var wizardEyesElement = setup.querySelector('.setup-wizard .wizard-eyes');
    var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
    var wizardFireballElement = setup.querySelector('.setup-fireball-wrap');
    var wizardFireballInput = setup.querySelector('input[name="fireball-color"]');

    var onWizardCoatClick = function () {
      var coatColor = window.colorize.generateColor(WIZARD_COATS, wizardCoatElement.style.fill);

      wizardCoatElement.style.fill = coatColor;
      wizardCoatInput.value = coatColor;
    };

    var onWizardEyesClick = function () {
      if (!wizardEyesElement.style.fill) {
        wizardEyesElement.style.fill = WIZARD_EYES[1];
        wizardEyesInput.value = WIZARD_EYES[1];
      } else {
        var eyesColor = window.colorize.generateColor(WIZARD_EYES, wizardEyesElement.style.fill);

        wizardEyesElement.style.fill = eyesColor;
        wizardEyesInput.value = eyesColor;
      }
    };

    var onWizardFireballClick = function () {
      if (!wizardFireballElement.style.backgroundColor) {
        wizardFireballElement.style.backgroundColor = WIZARD_FIREBALL[1];
        wizardFireballInput.value = WIZARD_FIREBALL[1];
      } else {
        var fireballColor = window.colorize.generateColor(
            WIZARD_FIREBALL,
            window.colorize.convertRgb2Hex(wizardFireballElement.style.backgroundColor)
        );

        wizardFireballElement.style.backgroundColor = fireballColor;
        wizardFireballInput.value = fireballColor;
      }
    };

    wizardCoatElement.addEventListener('click', onWizardCoatClick);
    wizardEyesElement.addEventListener('click', onWizardEyesClick);
    wizardFireballElement.addEventListener('click', onWizardFireballClick);
  };

  var setup = document.querySelector('.setup');

  renderSimilar();
  initWizardSetup();
})();
