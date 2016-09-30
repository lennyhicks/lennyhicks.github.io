var xWins = 0;
var oWins = 0;
var oTurn = false;
var lastWinnerX = true;
var lastWinnerO = false;
var turnCount = 0;
var isOccupied = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
var debugEnabled = true;

$(function() {


    $('#oWins').text(oWins);
    $('#xWins').text(xWins);


    $('td').click(function() {
        var td = $(this).attr("id");
        takeTurn(td);
    });

    $('#resetGame').click(function() {
        resetGame();
    });


});

function debug(msg) {
    if (debugEnabled) {
        console.log(msg);
    }
}

function takeTurn(box) {
    turnCount++

    if (isOccupied[box] < 1) {
        if (oTurn) {
            $('#' + box).text("O");
            debug("O placed in box " + box);
            isOccupied[box] = 1;
            oTurn = false;


        } else {
            $('#' + box).text("X");
            debug("X placed in box " + box);
            isOccupied[box] = 10;
            oTurn = true;
        }
        if (oTurn) {
            $('#turnText').text("O's Turn");
        } else {
            $('#turnText').text("X's Turn");
        }
        checkWin();
    } else {
        debug("Please choose another box.")
    }
}


function checkWin(oTurn) {
    //Winning combos 
    //[0,1,2][3,4,5][6,7,8][0,4,8][2,4,6][0,3,6][1,4,7][2,5,8]
    for (var i = 0; i < winningCombinations.length; i++)
        if ((isOccupied[(winningCombinations[i][0])]) + (isOccupied[(winningCombinations[i][1])]) + (isOccupied[(winningCombinations[i][2])]) == 3) {
            debug("O is the winner");
            $('#turnText').text("O is the Winner.");
            oWins++;
            $('#oWins').text(oWins);
            isOccupied = [9, 9, 9, 9, 9, 9, 9, 9, 9];
            lastWinnerX = false;
            lastWinnerO = true;

            oTurn = true;
        } else if ((isOccupied[(winningCombinations[i][0])]) + (isOccupied[(winningCombinations[i][1])]) + (isOccupied[(winningCombinations[i][2])]) == 30) {
        debug("X is the winner");
        xWins++;
        $('#turnText').text("X is the Winner");
        $('#xWins').text(xWins);
        isOccupied = [9, 9, 9, 9, 9, 9, 9, 9, 9];
        lastWinnerX = true;
        lastWinnerO = false;
    } else
    if (turnCount > 8) {

        $('#turnText').text("It's a tie. Please restart the game.");

    }

}

function resetGame() {

    isOccupied = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var box = 0; box <= 8; box++) {
        $('#' + box).text("");
    }
    if (lastWinnerX) {
        oTurn = false;
        turnCount = 0;
        $('#turnText').text("X's Turn");
    } else if (lastWinnerO) {
        oTurn = false;
        $('#turnText').text("O's Turn");
    }

}