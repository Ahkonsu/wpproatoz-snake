var snakeDefault = [[7, 10], [7, 9], [7, 8], [7, 7], [7, 6]];
var snake;
var snakeDirection = 2; // 1: up, 2: right, 3: down, 4: left
var snakeChangeDirection = 0;
var snakeInterval = 0;
var snakeCellsx = 40;
var snakeCellsy = 15;
var snakeFood;
var snakeScore = 0;
var snakeHasStarted = false;

function snakeDefaultSettings() {
    if (typeof snakeSettings === 'undefined') {
        snakeSettings = {};
    }
    snakeSettings.roundedborders = snakeSettings.roundedborders || 'false';
    snakeSettings.color = snakeSettings.color || 'red';
    snakeSettings.foodcolor = snakeSettings.foodcolor || 'orange';
    snakeSettings.timeout = parseInt(snakeSettings.timeout) || 200;
    if (snakeSettings.timeout < 100) {
        snakeSettings.timeout = 100;
    }
}

function snakeUpdateMessage(text) {
    jQuery('#snakeMessage').text(text);
}

function snakeBuildField() {
    var $snake = jQuery('#snake.wpproatoz-snake');
    var width = $snake.parent().width();
    if (width > 600) width = 600;
    var cellwidth = Math.floor(width / snakeCellsx);
    width = cellwidth * snakeCellsx;
    cellwidth -= 1;
    var cellheight = cellwidth;
    var height = snakeCellsy * (cellheight + 1);

    jQuery('#snakeContainer.wpproatoz-snake-container').width(width);
    $snake.width(width).height(height);

    $snake.empty();
    for (var y = 0; y < snakeCellsy; y++) {
        for (var x = 0; x < snakeCellsx; x++) {
            $snake.append('<div class="snake_cell" id="snake_cell_' + x + '_' + y + '"></div>');
        }
    }
    $snake.find('div.snake_cell').height(cellheight).width(cellwidth);
    if (snakeSettings.roundedborders === 'true') {
        $snake.find('div.snake_cell').css('border-radius', Math.floor(cellwidth / 2) + 'px');
    }
}

function snakeClearField() {
    snake = [];
    for (var i in snakeDefault) {
        snake.push([snakeDefault[i][0], snakeDefault[i][1]]);
    }

    snakeScore = 0;
    jQuery('#snakeScore').text(snakeScore);

    snakeUpdateFood();
    snakeUpdate();
}

function snakeStart() {
    if (snakeInterval !== 0) {
        return;
    }

    if (snakeHasStarted) {
        snakeClearField();
    }
    snakeHasStarted = true;

    snakeDirection = 2;
    snakeChangeDirection = 0;

    snakeInterval = window.setInterval(function() {
        snakeTick();
        snakeUpdate();
    }, snakeSettings.timeout);
}

function snakeValidFood(x, y) {
    for (var i in snake) {
        if (snake[i][0] === y && snake[i][1] === x) {
            return false;
        }
    }
    return true;
}

function snakeUpdateFood() {
    var maxAttempts = 100;
    var attempt = 0;
    var x, y;
    do {
        x = Math.floor(Math.random() * snakeCellsx);
        y = Math.floor(Math.random() * snakeCellsy);
        attempt++;
        if (attempt > maxAttempts) {
            for (y = 0; y < snakeCellsy; y++) {
                for (x = 0; x < snakeCellsx; x++) {
                    if (snakeValidFood(x, y)) {
                        snakeFood = [x, y];
                        console.log('Food placed via fallback at [' + x + ',' + y + ']');
                        return;
                    }
                }
            }
            console.warn('No valid food position found after max attempts');
            snakeFood = [Math.floor(snakeCellsx / 2), Math.floor(snakeCellsy / 2)];
            return;
        }
    } while (!snakeValidFood(x, y));
    snakeFood = [x, y];
    console.log('Food placed at [' + x + ',' + y + ']');
}

function snakeAddToScore(addition) {
    snakeScore += addition;
    jQuery('#snakeScore').text(snakeScore);
}

function snakeDie() {
    window.clearInterval(snakeInterval);
    snakeInterval = 0;
    snakeUpdateMessage("You're dead.");
    jQuery('#snake.wpproatoz-snake').css('background-color', '#f00');
    window.setTimeout(function() {
        jQuery('#snake.wpproatoz-snake').css('background-color', 'transparent');
    }, 50);
    return false;
}

function snakeTick() {
    if (snakeChangeDirection !== 0) {
        switch (snakeChangeDirection) {
            case 4: if (snakeDirection !== 2) snakeDirection = 4; break;
            case 1: if (snakeDirection !== 3) snakeDirection = 1; break;
            case 2: if (snakeDirection !== 4) snakeDirection = 2; break;
            case 3: if (snakeDirection !== 1) snakeDirection = 3; break;
        }
        snakeChangeDirection = 0;
    }

    var oldPosition = snake[snake.length - 1];

    for (var i = snake.length - 1; i > 0; i--) {
        snake[i] = [snake[i - 1][0], snake[i - 1][1]];
    }

    switch (snakeDirection) {
        case 1: snake[0][0]--; break; // Up
        case 2: snake[0][1]++; break; // Right
        case 3: snake[0][0]++; break; // Down
        case 4: snake[0][1]--; break; // Left
    }

    // Debug: Log snake and food positions
    console.log('Snake head: [' + snake[0][1] + ',' + snake[0][0] + '], Food: [' + snakeFood[0] + ',' + snakeFood[1] + ']');

    // Check if snake eats food (snake[y,x] vs food[x,y])
    if (snake[0][1] === snakeFood[0] && snake[0][0] === snakeFood[1]) {
        console.log('Food eaten at [' + snakeFood[0] + ',' + snakeFood[1] + ']');
        snakeAddToScore(5);
        snake.push(oldPosition);
        snakeUpdateFood();
    }
}

function snakeUpdate() {
    // Check boundaries.
    if (snake[0][0] < 0 || snake[0][0] >= snakeCellsy || snake[0][1] < 0 || snake[0][1] >= snakeCellsx) {
        return snakeDie();
    }

    if (snakeHasStarted) {
        if (snake[0][0] < 2 || snake[0][0] > snakeCellsy - 3 || snake[0][1] < 2 || snake[0][1] > snakeCellsx - 3) {
            snakeUpdateMessage("Careful!");
        } else {
            snakeUpdateMessage("Good job.");
        }
    }

    // Check self-collision.
    for (var i = 1; i < snake.length; i++) {
        if (snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]) {
            return snakeDie();
        }
    }

    // Clear cells.
    jQuery('.snake_cell').css('background-color', '#fff');

    // Draw snake.
    var color;
    switch (snakeSettings.color) {
        case 'red':
            color = function(i) { return 'rgb(' + Math.max(Math.floor(255 - i * 255 / snake.length), 0) + ',0,0)'; };
            break;
        case 'green':
            color = function(i) { return 'rgb(0,' + Math.max(Math.floor(255 - i * 255 / snake.length), 0) + ',0)'; };
            break;
        case 'blue':
            color = function(i) { return 'rgb(0,0,' + Math.max(Math.floor(255 - i * 255 / snake.length), 0) + ')'; };
            break;
        default:
            color = function(i) { return 'rgb(' + Math.max(Math.floor(255 - i * 255 / snake.length), 0) + ',0,0)'; };
    }
    for (var i in snake) {
        jQuery('#snake_cell_' + snake[i][1] + '_' + snake[i][0]).css('background-color', color(i));
    }

    // Draw food.
    if (snakeFood) {
        jQuery('#snake_cell_' + snakeFood[0] + '_' + snakeFood[1]).css('background-color', snakeSettings.foodcolor);
    } else {
        console.error('snakeFood is undefined, resetting food position');
        snakeUpdateFood();
    }
}

jQuery(document).ready(function($) {
    snakeDefaultSettings();
    if ($('#snake.wpproatoz-snake').length) {
        snakeBuildField();
        snakeClearField();
    }

    $(document).on('keydown', function(e) {
        var preventDefault = true;
        if (snakeChangeDirection === 0) {
            switch (e.keyCode) {
                case 37: snakeChangeDirection = 4; break; // Left
                case 38: snakeChangeDirection = 1; break; // Up
                case 39: snakeChangeDirection = 2; break; // Right
                case 40: snakeChangeDirection = 3; break; // Down
                default: preventDefault = false;
            }
        } else if (e.keyCode < 37 || e.keyCode > 40) {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    });
});