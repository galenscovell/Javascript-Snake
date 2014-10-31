

function create_board(width, height) {
    // Create game board depending on window size
    $('#game_board').width(width);
    $('#game_board').height(height);

    for (y = 0; y < height; y += 20) {
        for (x = 0; x < width; x += 20) {
            $('#game_board').append('<div class="game_square" id=' + (x / 20) + '_' + (y / 20) + '></div>');
        }
    }
}


function create_snake() {
    // Create 3-unit snake at (5,5), (4,5), (3,5)
    $('#5_5').addClass('snakehead');
    $('#4_5').addClass('snakebody');
    $('#3_5').addClass('snakebody');

    // Add snake position to SNAKE array
    SNAKE.push('5_5');
    SNAKE.push('4_5');
    SNAKE.push('3_5');
}


function generate_fruit() {
    // Generate randomly placed fruit on board
    var fruitX = Math.round((Math.random() * boardWidth) / 20) * 20;
    var fruitY = Math.round((Math.random() * boardHeight) / 20) * 20;
    var fruitID = '#' + (fruitX / 20) + "_" + (fruitY / 20);

    $(fruitID).addClass('fruit');
}


function snake_movement() {
    var currentMove = '';

    setInterval(function() {
        if (currentMove != '') {
            move(currentMove);
        }
    }, 500);

    $(document).keydown(function(event) {
        switch (event.which) {
            case 39:
                currentMove = 'right';
            case 37:
                currentMove = 'left';
            case 38:
                currentMove = 'up';
            case 40:
                currentMove = 'down';
        }
        alert(event.which);
    });

    
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




// Global Variables
var boardWidth = Math.round($(window).width() * 0.8 / 20) * 20;
var boardHeight = Math.round($(window).height() * 0.7 / 20) * 20;
var SNAKE = [];


$(document).ready(function() {
    create_board(boardWidth, boardHeight);
    create_snake();
});