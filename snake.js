

// Global Variables
var boardWidth = Math.round(screen.width * 0.7 / 10) * 10;
var boardHeight = Math.round(screen.height * 0.6 / 10) * 10;


$(document).ready(function() {
    console.log(boardWidth, boardHeight);

    $('#game_board').width(boardWidth);
    $('#game_board').height(boardHeight);

    for (x = 0; x < boardWidth; x += 20) {
        for (y = 0; y < boardHeight; y += 20) {
            $('#game_board').append('<div class="game_square" id=' + (x / 20) + ',' + (y / 20) + '></div>');
        }
    }  

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