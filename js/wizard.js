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

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  window.wizard = wizard;

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

      wizard.onCoatChange(coatColor);
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

      wizard.onEyesChange(eyesColor);
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

  initWizardSetup();
})();
