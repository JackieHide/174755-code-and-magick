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
  var HEADING_OFFSET_X = 20;
  var HEADING_OFFSET_Y = 30;
  var TEXT_FONT = '16px PT Mono';
  var TEXT_COLOR = 'black';
  var CLOUD_SHADOW_OFFSET = 10;
  var HEADING_TEXT_1 = 'Ура вы победили!';
  var HEADING_TEXT_2 = 'Список результатов:';
  var MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';
  var PLAYER_BAR_COLOR = ['0', '0', '255'];
  var CLOUD_BG_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';


  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderHeading = function (ctx) {
    ctx.font = TEXT_FONT;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(HEADING_TEXT_1, CLOUD_X + HEADING_OFFSET_X, CLOUD_Y + HEADING_OFFSET_Y);
    ctx.fillText(HEADING_TEXT_2, CLOUD_X + HEADING_OFFSET_X, CLOUD_Y + HEADING_OFFSET_Y + FONT_GAP);
  };

  var renderBar = function (ctx, name, time, i, maxTime) {
    var colHeight = BAR_HEIGHT * time / maxTime;
    var nameY = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE;
    var barX = CLOUD_X + LEFT_OFFSET + (BAR_GAP + BAR_WIDTH) * i;
    var barY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - FONT_SIZE - colHeight;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(name, barX, nameY);
    ctx.fillText(Math.ceil(time), barX, barY - GAP);

    if (name === 'Вы') {
      ctx.fillStyle = MY_BAR_COLOR;
    } else {
      ctx.fillStyle = 'rgba(' + PLAYER_BAR_COLOR[0] +
        ',' + PLAYER_BAR_COLOR[1] + ',' + PLAYER_BAR_COLOR[2] + ',' + Math.random() + ')';
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
    renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_BG_COLOR);
    renderHeading(ctx);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, names[i], times[i], i, maxTime);
    }
  };
})();
