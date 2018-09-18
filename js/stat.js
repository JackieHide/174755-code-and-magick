'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_GAP = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var FONT_GAP = 20;
  var FONT_SIZE = 16;
  var LEFT_OFFSET = 40;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderHeading = function (ctx) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = 'black';
    ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 30);
    ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 50);
  };

  var renderBar = function (ctx, name, time, i, maxTime) {
    var colHeight = BAR_HEIGHT * time / maxTime;
    var nameY = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE;
    var barX = CLOUD_X + LEFT_OFFSET + (BAR_GAP + BAR_WIDTH) * i;
    var barY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - FONT_SIZE - colHeight;

    ctx.fillStyle = 'black';
    ctx.fillText(name, barX, nameY);
    ctx.fillText(Math.ceil(time), barX, barY - GAP);

    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }

    ctx.fillRect(barX, barY, BAR_WIDTH, colHeight);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    renderHeading(ctx);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, names[i], times[i], i, maxTime);
    }
  };
})();
