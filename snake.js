

function create_board(width, height) {
    // Create game board depending on window size
    $('#game_board').width(width);
    $('#game_board').height(height);

    var count = 0;

    for (y = 0; y < (height / 20); y++) {
        for (x = 0; x < (width / 20); x++) {
            $('<div class="game_square" id=' + (x + 1 + count) + '></div>').appendTo('#game_board');

            // Add border class to first iteration of each row
            if (x == 0) {
                $('#' + (x + 1 + count)).addClass('border');
                $('#' + (x + 1 + count)).css({
                    'background-color': '#262626',
                    'box-shadow': 'none'
                });
            // Add border class to final iteration of each row
            } else if (x == ((width / 20) - 1)) {
                $('#' + (x + 1 + count)).addClass('border');
                $('#' + (x + 1 + count)).css({
                    'background-color': '#262626',
                    'box-shadow': 'none'
                });
            }

        }
        // Begin next row, append board width to new iteration
        count += NEXTROW;
        $("<div id=" + (y + 1) + "></div>").css("clear", "both").appendTo('#game_board');
    }
}


function create_snake() {
    // Initialize 3-unit snake at div 122, 121, 120
    $('#120').addClass('snake');
    $('#121').addClass('snake');
    $('#122').addClass('snakehead');

    // Push snake segments to snake array
    SNAKE.push('120');
    SNAKE.push('121');
    SNAKE.push('122');
}



function generate_fruit() {
    // Generate randomly placed fruit on board
    var fruitGenerated = false;
    while (fruitGenerated == false) {
        var fruitID = '#' + (Math.round(Math.random() * ((boardWidth / 20) * (boardHeight / 20))));
        if (!$(fruitID).attr('class').match(/snake|snakehead|border|badfruit/)) {
            $(fruitID).addClass('fruit');
            fruitGenerated = true;
        } 
    }
    // Generate randomly placed bad fruit on board
    var badFruitGenerated = 0;
    while (badFruitGenerated !== 5) {
        var badFruitID = '#' + (Math.round(Math.random() * ((boardWidth / 20) * (boardHeight / 20))));
        if (!$(badFruitID).attr('class').match(/snake|snakehead|border|fruit/)) {
            $(badFruitID).addClass('badfruit');
            badFruitGenerated += 1;
        } 
    }
}


function game_play() {
    var currentMove = '';

    var intervalID = setInterval(function() {
        if (currentMove != '') {
            move(currentMove);
        }
    }, 80);

    $(document).keydown(function(event) {
        event.preventDefault();
        switch (event.which) {
            case 39:
                currentMove = 'right';
                break;
            case 37:
                currentMove = 'left';
                break;
            case 38:
                currentMove = 'up';
                break;
            case 40:
                currentMove = 'down';
                break;
        }
    });
    
    var move = function(dir) {
        var currentPosition = SNAKE[SNAKE.length - 1];
        var nextID = 0;

        switch(dir) {
            case 'right':
                nextID = parseInt(currentPosition) + 1;
                break;
            case 'left':
                nextID = parseInt(currentPosition) - 1;
                break;
            case 'up':
                nextID = (parseInt(currentPosition) - NEXTROW);
                break;
            case 'down':
                nextID = (parseInt(currentPosition) + NEXTROW);
                break;
        }

        // Fruit-eating event
        var snakeTail = 0;
        if ($('#' + nextID).hasClass('fruit')) {
            snakeTail = SNAKE[0];
            $('.fruit').removeClass('fruit');
            $('.badfruit').removeClass('badfruit');
            SCORE += 10;
            $('p').html("SCORE: " + SCORE + "pts.");
            generate_fruit();
        }

        // Bad fruit-eating event
        if ($('#' + nextID).hasClass('badfruit')) {
            $('#' + nextID).removeClass('badfruit');
            SCORE -= 10;
            $('p').html("SCORE: " + SCORE + "pts.");
        }

        // Snake collision event
        if ($('#' + nextID).hasClass('snake')) {
            currentMove = '';
            clearInterval(intervalID);
            alert("Collision! End Score: " + SCORE);
            init_game();
            return;
        }

        // Top/bottom boundary collision
        if (!$('#' + nextID).hasClass('game_square')) {
            currentMove = '';
            clearInterval(intervalID);
            alert("Collision! End Score: " + SCORE);
            init_game();
            return;
        }

        // Left/right boundary collision
        if ($('#' + nextID).hasClass('border')) {
            currentMove = '';
            clearInterval(intervalID);
            alert("Collision! End Score: " + SCORE);
            init_game();
            return;
        }

        // Remove old segment positions
        for (var s = 0; s < SNAKE.length; s++) {
            $('#' + SNAKE[s]).removeClass('snake');
            SNAKE[s] = SNAKE[s + 1];
        }

        // Add segment if fruit eaten
        if (snakeTail !== 0) {
            SNAKE.unshift(snakeTail);
        }

        // Add new segment positions
        for (var u = 0; u < SNAKE.length; u++) {
            $('#' + SNAKE[u]).addClass('snake');
        }

        SNAKE[SNAKE.length - 1] = nextID;
        $("#" + nextID).addClass('snakehead');
        $("#" + currentPosition).removeClass('snakehead');
    }
}


function init_game() {
    SNAKE = [];
    SCORE = 0;
    $('.snake').removeClass('snake');
    $('.snakehead').removeClass('snakehead');
    $('.fruit').removeClass('fruit');
    $('.badfruit').removeClass('badfruit');
    $('p').html("SCORE: " + SCORE + "pts.");

    create_snake();
    generate_fruit();
    game_play();
}


$(document).keypress(function(event) {
    if (event.which === 13) {
        if ($('p').html() == "PRESS ENTER TO START") {
            event.preventDefault();
            init_game();
        }
    }
});


// Grid Variables
var boardWidth = Math.round($(window).width() * 0.8 / 20) * 20;
var boardHeight = Math.round($(window).height() * 0.7 / 20) * 20;

// Global
var NEXTROW = (boardWidth / 20);
var SNAKE = [];
var SCORE = 0;


$(document).ready(function() {
    create_board(boardWidth, boardHeight);
});