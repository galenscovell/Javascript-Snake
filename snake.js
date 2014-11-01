

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
    // Create 3-unit snake at (9,9), (8,9), (7,9)
    $('#9_9').addClass('snakehead');
    $('#8_9').addClass('snake');
    $('#7_9').addClass('snake');

    // Add body segment positions to object
    
}



function generate_fruit() {
    // Generate randomly placed fruit on board
    var fruitX = Math.round((Math.random() * boardWidth) / 20) * 20;
    var fruitY = Math.round((Math.random() * boardHeight) / 20) * 20;
    var fruitID = '#' + (fruitX / 20) + "_" + (fruitY / 20);

    if ($(fruitID).is('.snake', 'snakehead')) {
        generate_fruit();
    } else {
        $(fruitID).addClass('fruit');
    }
}


function update_head(direction) {
    var current = $('.snakehead').attr('id').split("_");
    var update = 0;

    $('.snakehead').removeClass('snakehead');

    if (direction === 'right') {
        update = parseInt(current[0]) + 1;
        updatedSpot = "#" + update + "_" + current[1];
        return updatedSpot;
    } else if (direction === 'left') {
        update = parseInt(current[0]) - 1;
        updatedSpot = "#" + update + "_" + current[1];
        return updatedSpot;
    } else if (direction === 'up') {
        update = parseInt(current[1]) - 1;
        updatedSpot = "#" + current[0] + "_" + update;
        return updatedSpot;
    } else if (direction === 'down') {
        update = parseInt(current[1]) + 1;
        updatedSpot = "#" + current[0] + "_" + update;
        return updatedSpot;
    }
}

function update_body() {
    
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
        switch(dir) {
            case 'right':
                $(update_head('right')).addClass('snakehead');
                //update_body();
                break;

            case 'left':
                $(update_head('left')).addClass('snakehead');
                //update_body();
                break;

            case 'up':
                $(update_head('up')).addClass('snakehead');
                //update_body();
                break;

            case 'down':
                $(update_head('down')).addClass('snakehead');
                //update_body();
                break;

        }
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




// Global Variables
var boardWidth = Math.round($(window).width() * 0.8 / 20) * 20;
var boardHeight = Math.round($(window).height() * 0.7 / 20) * 20;
var BODY = [];


$(document).ready(function() {
    create_board(boardWidth, boardHeight);
    create_snake();
});