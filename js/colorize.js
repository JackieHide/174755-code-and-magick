'use strict';

window.colorize = (function () {
  var hex = function (x) {
    return ('0' + parseInt(x, 10).toString(16)).slice(-2);
  };

  return {
    generateColor: function (colorsArray, currentColor) {
      var color = colorsArray[window.util.generateRandomNumber(0, colorsArray.length - 1)];

      while (color === currentColor) {
        color = colorsArray[window.util.generateRandomNumber(0, colorsArray.length - 1)];
      }

      return color;
    },

    convertRgb2Hex: function (rgb) {
      var hexColor;

      if (rgb) {
        var rgbColor = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        hexColor = '#' + hex(rgbColor[1]) + hex(rgbColor[2]) + hex(rgbColor[3]);
      }

      return hexColor;
    },
  };
})();
