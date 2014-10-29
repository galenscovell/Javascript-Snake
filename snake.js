
$(document).ready(function() {

    for (var r = 0; r < 78; r++) {
        $('#inner_container').append('<div class="column"></div>');
    }
    
    for (var c = 0; c < 54; c++) {
        $('.column').append('<div class="gamesquare"></div>');
    } 
    
});