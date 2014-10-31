

// Global Variables
var boardWidth = Math.round($(window).width() * 0.8 / 20) * 20;
var boardHeight = Math.round($(window).height() * 0.7 / 20) * 20;

var playerPosition = [0, 0];
var positionElement = "pos" + playerPosition.join("_");


$(document).ready(function() {
    $('#game_board').width(boardWidth);
    $('#game_board').height(boardHeight);

    for (x = 0; x < boardWidth; x += 20) {
        for (y = 0; y < boardHeight; y += 20) {
            $('#game_board').append('<div class="game_square" id=pos' + (x / 20) + '_' + (y / 20) + '></div>');
        }
    }

    $('#' + positionElement).css('background-color', 'rgba(0, 125, 0, 0.5)');

    $('.game_square').click(function() {
        console.log( $(this).attr('id') );
    });

});


$(document).keypress(function(event) {
    console.log(event.which);
    if (event.which == 13) {
        event.preventDefault();
        $('p').html("PRESS ARROWS TO CHANGE DIRECTION");
    }
});