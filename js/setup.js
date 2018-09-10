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

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateArray = function () {
  var temporaryArray = [];

  for (var i = 0; i <= 3; i++) {
    temporaryArray.push({
      name: WIZARD_NAMES[generateRandomNumber(0, WIZARD_NAMES.length - 1)] +
        ' ' + WIZARD_LASTNAMES[generateRandomNumber(0, WIZARD_LASTNAMES.length - 1)],
      coatColor: WIZARD_COATS[generateRandomNumber(0, WIZARD_COATS.length - 1)],
      eyesColor: WIZARD_EYES[generateRandomNumber(0, WIZARD_EYES.length - 1)],
    });
  }

  return temporaryArray;
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
  var generatedArray = generateArray();
  var fragment = document.createDocumentFragment();
  var similarListElement = setupBlock.querySelector('.setup-similar-list');

  for (var i = 0; i < generatedArray.length; i++) {
    fragment.appendChild(renderWizard(generatedArray[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
};

var setupBlock = document.querySelector('.setup');

setupBlock.classList.remove('hidden');

renderSimilar();
