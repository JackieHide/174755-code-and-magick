'use strict';
(function () {
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

  var setup = document.querySelector('.setup');

  // общий обработчик ошибок xhr
  var commonErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(230, 126, 24, 0.86);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // создает волшебника в "Похожих персонажах"
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                .content
                                .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // создает четырех волшебников в "Похожих персонажах"
  var renderSimilar = function () {
    var fragment = document.createDocumentFragment();
    var similarListElement = setup.querySelector('.setup-similar-list');

    var successHandler = function (wizards) {
      for (var i = 0; i < 4; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      document.querySelector('.setup-similar').classList.remove('hidden');
    };

    window.backend.load(successHandler, commonErrorHandler);
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

  var initForm = function () {
    var form = setup.querySelector('.setup-wizard-form');

    var successHandler = function () {
      setup.classList.add('hidden');
    };

    form.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(form), successHandler, commonErrorHandler);
      evt.preventDefault();
    });
  };

  renderSimilar();
  initForm();
  initWizardSetup();
})();
