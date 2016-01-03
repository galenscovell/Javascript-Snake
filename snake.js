/**
 * Snake dynamic controls
 * ======================
 *
 * @author GalenS <galen.scovell@gmail.com>
 */


// Grid Variables
var BOARDWIDTH = Math.round($(window).width() * 0.8 / 24) * 24;
var BOARDHEIGHT = Math.round($(window).height() * 0.7 / 24) * 24;

// Global
var CELLSIZE = 24;
var NEXTROW = (BOARDWIDTH / 24);
var SNAKE = [];
var SCORE = 0;
var SPEED = 80;


function createBoard() {
    // Create game board depending on window size
    $("#game_board").width(BOARDWIDTH);
    $("#game_board").height(BOARDHEIGHT);

    var count = 0;

    for (y = 0; y < (BOARDHEIGHT / CELLSIZE); y++) {
        for (x = 0; x < (BOARDWIDTH / CELLSIZE); x++) {
            $("<div class='game_square' id=" + (x + 1 + count) + "></div>").appendTo("#game_board");

            // Add border class to first iteration of each row
            if (x == 0 || (x == ((BOARDWIDTH / CELLSIZE) - 1))) {
                $("#" + (x + 1 + count)).addClass("border");
                $("#" + (x + 1 + count)).css({
                    "background-color": "#f3f3f3",
                    "box-shadow": "none"
                });
            }
        }
        // Begin next row, append board width to new iteration
        count += NEXTROW;
        $("<div id=" + (y + 1) + "></div>").css("clear", "both").appendTo("#game_board");
    }
}


function createSnake() {
    // Initialize 3-unit snake at cell 120, 121, 122
    $("#120").addClass("snake");
    $("#121").addClass("snake");
    $("#122").addClass("snakehead");

    // Push snake segments to snake array
    SNAKE.push("120");
    SNAKE.push("121");
    SNAKE.push("122");
}

function generateFruit() {
    // Generate randomly placed fruit on board
    var fruitGenerated = false;
    while (fruitGenerated == false) {
        var fruitID = '#' + (Math.round(Math.random() * ((BOARDWIDTH / CELLSIZE) * (BOARDHEIGHT / CELLSIZE))));
        if (!$(fruitID).attr("class").match(/snake|snakehead|border|badfruit/)) {
            $(fruitID).addClass("fruit");
            fruitGenerated = true;
        } 
    }
    // Generate randomly placed bad fruit on board
    var badFruitGenerated = 0;
    while (badFruitGenerated !== 5) {
        var badFruitID = '#' + (Math.round(Math.random() * ((BOARDWIDTH / CELLSIZE) * (BOARDHEIGHT / CELLSIZE))));
        if (!$(badFruitID).attr("class").match(/snake|snakehead|border|fruit/)) {
            $(badFruitID).addClass("badfruit");
            badFruitGenerated += 1;
        } 
    }
}

function gamePlay() {
    var currentMove = "";

    var intervalID = setInterval(function() {
        if (currentMove != "") {
            move(currentMove);
        }
    }, SPEED);

    $(document).keydown(function(event) {
        event.preventDefault();
        switch (event.which) {
            case 39:
                currentMove = "right";
                break;
            case 37:
                currentMove = "left";
                break;
            case 38:
                currentMove = "up";
                break;
            case 40:
                currentMove = "down";
                break;
        }
    });
    
    var move = function(dir) {
        var currentPosition = SNAKE[SNAKE.length - 1];
        var nextID = 0;

        switch(dir) {
            case "right":
                nextID = parseInt(currentPosition) + 1;
                break;
            case "left":
                nextID = parseInt(currentPosition) - 1;
                break;
            case "up":
                nextID = (parseInt(currentPosition) - NEXTROW);
                break;
            case "down":
                nextID = (parseInt(currentPosition) + NEXTROW);
                break;
        }

        // Fruit-eating event
        var snakeTail = 0;
        if ($("#" + nextID).hasClass("fruit")) {
            snakeTail = SNAKE[0];
            $(".fruit").removeClass("fruit");
            $(".badfruit").removeClass("badfruit");
            SCORE += 10;
            $("#startslate").html("SCORE: " + SCORE + "pts.");
            generateFruit();
        }

        // Bad fruit-eating event
        if ($("#" + nextID).hasClass("badfruit")) {
            $("#" + nextID).removeClass("badfruit");
            SCORE -= 10;
            $("#startslate").html("SCORE: " + SCORE + "pts.");
        }

        // Snake collision event
        if ($("#" + nextID).hasClass("snake")) {
            currentMove = "";
            clearInterval(intervalID);
            $("#startslate").html("Collision! End Score: " + SCORE);
            setTimeout(function() {
                initGame();
            }, 2000);
            return;
        }

        // Top/bottom boundary collision
        if (!$("#" + nextID).hasClass("game_square")) {
            currentMove = "";
            clearInterval(intervalID);
            $("#startslate").html("Collision! End Score: " + SCORE);
            setTimeout(function() {
                initGame();
            }, 2000);
            return;
        }

        // Left/right boundary collision
        if ($("#" + nextID).hasClass("border")) {
            currentMove = "";
            clearInterval(intervalID);
            $("#startslate").html("Collision! End Score: " + SCORE);
            setTimeout(function() {
                initGame();
            }, 2000);
            return;
        }

        // Remove old segment positions
        for (var s = 0; s < SNAKE.length; s++) {
            $("#" + SNAKE[s]).removeClass("snake");
            SNAKE[s] = SNAKE[s + 1];
        }

        // Add segment if fruit eaten
        if (snakeTail !== 0) {
            SNAKE.unshift(snakeTail);
        }

        // Add new segment positions
        for (var u = 0; u < SNAKE.length; u++) {
            $("#" + SNAKE[u]).addClass("snake");
        }

        SNAKE[SNAKE.length - 1] = nextID;
        $("#" + nextID).addClass("snakehead");
        $("#" + currentPosition).removeClass("snakehead");
    }
}

function initGame() {
    SNAKE = [];
    SCORE = 0;
    $(".snake").removeClass("snake");
    $(".snakehead").removeClass("snakehead");
    $(".fruit").removeClass("fruit");
    $(".badfruit").removeClass("badfruit");
    $("#startslate").html("SCORE: " + SCORE + "pts.");

    createSnake();
    generateFruit();
    gamePlay();
}

$(document).keypress(function(event) {
    if (event.which === 13) {
        if ($("#startslate").html() == "PRESS ENTER TO START") {
            event.preventDefault();
            initGame();
        }
    }
});

$(document).ready(function() {
    createBoard();
});