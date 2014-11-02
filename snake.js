

function create_board(width, height) {
    // Create game board depending on window size
    $('#game_board').width(width);
    $('#game_board').height(height);

    var count = 0;
    var container = $('#game_board');

    for (y = 0; y < (height / 20); y++) {
        for (x = 0; x < (width / 20); x++) {
            $('<div class="game_square" id=' + (x + 1 + count) + '></div>').appendTo(container);
        }
        count += NEXTROW;
        $("<div id=" + (y + 1) + "></div>").css("clear", "both").appendTo(container);
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
    var fruitID = '#' + (Math.round(Math.random() * (boardWidth / 20) * 22));

    // Make sure it isn't generated on snake
    if ($(fruitID).is('.snake', '.snakehead')) {
        generate_fruit();
    } else {
        $(fruitID).addClass('fruit');
    }
}


function snake_movement() {
    var currentMove = '';

    setInterval(function() {
        if (currentMove != '') {
            move(currentMove);
        }
    }, 100);

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

        switch(dir) {
            case 'right':
                var nextID = parseInt(currentPosition) + 1;
                break;
            case 'left':
                var nextID = currentPosition - 1;
                break;
            case 'up':
                var nextID = (currentPosition - NEXTROW);
                break;
            case 'down':
                var nextID = (parseInt(currentPosition) + NEXTROW);
                break;
        }

        // Fruit-eating event
        var snakeTail = 0;
        if ($('#' + nextID).hasClass('fruit')) {
            snakeTail = SNAKE[0];
            $('#' + nextID).removeClass('fruit');
            generate_fruit();
        }

        // Snake collision event
        if ($('#' + nextID).hasClass('snake')) {
            alert('Collision!');
            currentMove = '';
        }

        // Update snake segments
        for (var s = 0; s < SNAKE.length; s++) {
            $('#' + SNAKE[s]).removeClass('snake');
            SNAKE[s] = SNAKE[s + 1];
        }

        if (snakeTail !== 0) {
            SNAKE.unshift(snakeTail);
        }

        for (var u = 0; u < SNAKE.length; u++) {
            $('#' + SNAKE[u]).addClass('snake');
        }

        SNAKE[SNAKE.length - 1] = nextID;
        $("#" + nextID).addClass('snakehead');
        $("#" + currentPosition).removeClass('snakehead');
    }
}


function play_game() {
    generate_fruit();
    snake_movement();
}


$(document).keypress(function(event) {
    console.log(event.which);
    if (event.which === 13) {
        if ($('p').html() == "PRESS ENTER TO START") {
            event.preventDefault();
            $('p').html("PRESS ARROW KEYS TO CHANGE DIRECTION");

            play_game();
        }
    }
});




// Grid Variables
var boardWidth = Math.round($(window).width() * 0.8 / 20) * 20;
var boardHeight = Math.round($(window).height() * 0.7 / 20) * 20;

// Global
var NEXTROW = (boardWidth / 20);
var SNAKE = [];


$(document).ready(function() {
    create_board(boardWidth, boardHeight);
    create_snake();
});