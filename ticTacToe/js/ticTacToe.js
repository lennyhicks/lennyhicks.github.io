//////////////////////////////////////////////////////////////////
//           Back-End Provided by Lenny Hicks                   //
//              Working as a team project.                      //
//////////////////////////////////////////////////////////////////
//   O win counter in my top left should have an Id of oWins    //
//                                                              //
//   X win counter in my top right should have an Id of xWins   //
//                                                              //
//  Middle text that shows current turn has the Id of turnText  //
//                                                              //
//  Tables was used in my page with three rows and three columns //
//                                                              //
//  Each cell of the table should have a value starting at 0    //
//      and continue until it reaches 8 on the last cell.       //
//                                                              //
//      The reset button should have the Id of resetGame        //
//                                                              //
//                     Front end example                        //
//      https://lennyhicks.github.io/projects/ticTacToe/        //
//                                                              //
//////////////////////////////////////////////////////////////////




var xWins = 0;
var oWins = 0;
var oTurn = false;
var lastWinnerX = true;
var lastWinnerO = false;
var turnCount = 0;
//Checks spaces in order of showing on the board. 0, 1, 2
//                                                 3, 4, 5
//                                                 6, 7, 8
var isOccupied = [0, 0, 0, 0, 0, 0, 0, 0, 0]

//Stores all avaliable Winning Combination
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


//Sets debug on or off
var debugEnabled = true;

$(function() {

    //Id for the O Win counter
    $('#oWins').text(oWins);

    //Id for the X Win counter
    $('#xWins').text(xWins);

    //My board is a table of three rows three columns. This checks where it is checks by finding the id. Id should start at 0 for the first and end with 8 on the last.
    $('td').click(function() {
        var td = $(this).attr("id");

        //Takes a turn with the spot number pushed from the table id.
        takeTurn(td);
    });
    //Button to reset the game with the Id resetGame
    $('#resetGame').click(function() {
        resetGame();
    });


});


//My debug function to log responses
function debug(msg) {
    if (debugEnabled) {
        console.log(msg);
    }
}

//Start of my takeTurn function
function takeTurn(box) {


    //Check if current box is occupied
    if (isOccupied[box] < 1) {

    //Add one to the turn count.
    turnCount++

        //Checks if it is O's Turn if current box is empty
        if (oTurn) {

            //Set current box to O 
            $('#' + box).text("O");
            debug("O placed in box " + box);

            //Change the box to occupied and value of 1 for later math winner check.
            isOccupied[box] = 1;

            //Changes the turn to X
            oTurn = false;


        } else {

            //Sets the current box to X
            $('#' + box).text("X");
            debug("X placed in box " + box);

            //Sets the current box value to 10 for later math winner check
            isOccupied[box] = 10;

            //Changes to O's turn
            oTurn = true;
        }
        if (oTurn) {

            //Id for top middle text between the win count to show whos turn it is
            $('#turnText').text("O's Turn");
        } else {

            //Id for top middle text between the win count to show whos turn it is
            $('#turnText').text("X's Turn");
        }

        //checks for win after other functions have finished
        checkWin();
    } else {
        debug("Please choose another box.")
    }
}


function checkWin(oTurn) {
    //Winning combos 
    //[0,1,2][3,4,5][6,7,8][0,4,8][2,4,6][0,3,6][1,4,7][2,5,8]

    //Run though the winningCombinations array for all winningCombinations and trys to put the into the isOccupied array to check for win
    // the value of 3 would mean O would win due to boxes being set to value of 1 on line 76
    for (var i = 0; i < winningCombinations.length; i++)
        if ((isOccupied[(winningCombinations[i][0])]) + (isOccupied[(winningCombinations[i][1])]) + (isOccupied[(winningCombinations[i][2])]) == 3) {
            debug("O is the winner");

            //sets the middle text at top of the page to O is the winner
            $('#turnText').text("O is the Winner.");

            //add a win count to O
            oWins++;

            //Shows current win count of O
            $('#oWins').text(oWins);

            //Sets all boxed to occupied so game cannot continue until restart
            isOccupied = [9, 9, 9, 9, 9, 9, 9, 9, 9];

            //Sets the last winner to O
            lastWinnerX = false;
            lastWinnerO = true;

            oTurn = true;
            //Run though the winningCombinations array for all winningCombinations and trys to put the into the isOccupied array to check for win
            // the value of 30 would mean X would win due to boxes being set to value of 10 on line 89
        } else if ((isOccupied[(winningCombinations[i][0])]) + (isOccupied[(winningCombinations[i][1])]) + (isOccupied[(winningCombinations[i][2])]) == 30) {

        //sets the middle text at top of the page to O is the winner
        debug("X is the winner");

        //add a wincount to X
        xWins++;
        $('#turnText').text("X is the Winner");

        //Shows current win count of X
        $('#xWins').text(xWins);


        //Sets all boxed to occupied so game cannot continue until restart
        isOccupied = [9, 9, 9, 9, 9, 9, 9, 9, 9];


        //Sets the last winner to X
        lastWinnerX = true;
        lastWinnerO = false;
    } else

    //if turn count is greater then 8 then the game will be marked as a tie
    if (turnCount > 8) {

        // Set the top middle text to the its a tie string
        $('#turnText').text("It's a tie. Please restart the game.");

    }

}

function resetGame() {


    //resets the turncount to 0
    turnCount = 0;

    //resets all box values to 0
    isOccupied = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var box = 0; box <= 8; box++) {
        //Loops through all boxes and removes the text
        $('#' + box).text("");
    }


    if (lastWinnerX) {

        //sets the last winner for the next game to start on
        oTurn = false;

        //Sets the top middle text to X's turn
        $('#turnText').text("X's Turn");
    } else if (lastWinnerO) {
        //Sets the 
        oTurn = false;

        //Sets the top middle text to O's Turn
        $('#turnText').text("O's Turn");
    }

}