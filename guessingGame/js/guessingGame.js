var numberOne;
var numberTwo;
var numberThree;
var guessOne;
var guessTwo;
var guessThree;
var guessCount = 10;
var debugEnabled = true;
var wonGame = false;

function debug(msg) {
    if (debugEnabled) {
        console.log(msg);
    }
}

//Check to make sure input is a number
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

//Gets the new numbers for the game.
function getNewNumbers() {
    numberOne = Math.round(Math.random() * 9);
    numberTwo = Math.round(Math.random() * 9);
    numberThree = Math.round(Math.random() * 9);
    if (numberOne != numberTwo && numberOne != numberThree && numberTwo != numberThree) {
        debug("You have three random numbers non matching");
    } else if (numberOne == numberTwo || numberOne == numberThree || numberTwo == numberThree) {
        debug("Rerolling Numbers");
        getNewNumbers();

    }
}

function guessNumbers() {

    //Get Values for Guesses.
    guessOne = $("#guessOne").val();
    guessTwo = $("#guessTwo").val();
    guessThree = $("#guessThree").val();
    debug("Guess One = " + guessOne);
    debug("Guess Two = " + guessTwo);
    debug("Guess Three = " + guessThree);


    debug("Number One = " + numberOne + ". Number Two = " + numberTwo + ". Number Three = " + numberThree);
    //Check your Guesses
    if (guessOne != guessTwo && guessOne != guessThree && guessTwo != guessThree) {
        guessCount--;
        debug(guessCount);
        //Check All Guesses
        if (guessOne == numberOne && guessTwo == numberTwo && guessThree == numberThree) {
            $("#guessOne").attr("class", "col-md-2 col-md-push-3 input right");
            $("#guessTwo").attr("class", "col-md-2 col-md-push-3 input right");
            $("#guessThree").attr("class", "col-md-2 col-md-push-3 input right");
            debug("You win the game with " + guessCount + " guesses remaining.");
            $('#guessLeft').text("You win the game with " + guessCount + " guesses remaining.");
            $('#guessButton').text('Reset the Game');
            wonGame = true;

        } else {
            //Check Guess One
            if (guessOne == numberOne) {
                debug("This Matches One")
                $("#guessOne").attr("class", "col-md-2 col-md-push-3 input right");

            } else if (guessOne == numberTwo || guessOne == numberThree) {
                debug("This Matches another one")
                $("#guessOne").attr("class", "col-md-2 col-md-push-3 input otherRight");
            } else if (guessOne != numberTwo || guessOne != numberThree) {
                debug("This Guess Matches Nothing")
                $("#guessOne").attr("class", "col-md-2 col-md-push-3 input otherWrong");
            }



            //Check Guess Two
            if (guessTwo == numberTwo) {
                debug("This Matches Two")
                $("#guessTwo").attr("class", "col-md-2 col-md-push-3 input right");

            } else if (guessTwo == numberOne || guessTwo == numberThree) {
                debug("This Matches Another Box")
                $("#guessTwo").attr("class", "col-md-2 col-md-push-3 input otherRight");
            } else if (guessTwo != numberTwo || guessTwo != numberThree) {
                debug("This Guess Matches Nothing")
                $("#guessTwo").attr("class", "col-md-2 col-md-push-3 input otherWrong");
            }




            //Check Guess Three
            if (guessThree == numberThree) {
                debug("This Matches Three")
                $("#guessThree").attr("class", "col-md-2 col-md-push-3 input right");

            } else if (guessThree == numberOne || guessThree == numberTwo) {
                debug("This Matches another one")
                $("#guessThree").attr("class", "col-md-2 col-md-push-3 input otherRight");
            } else if (guessThree != numberTwo || guessThree != numberOne) {
                debug("This Guess Matches Nothing")
                $("#guessThree").attr("class", "col-md-2 col-md-push-3 input otherWrong");
            }
        }
        if (guessOne != numberOne || guessTwo != numberTwo || guessThree != numberThree) {
            $('#guessLeft').text("Not all numbers are matching. " + guessCount + " guesses remaining.");
        }

    } else {
        debug("Please enter different numbers");

        $('#guessLeft').text("Please enter numbers that do not match.");
    }

}

function resetGame() {
    wonGame = false;
    guessCount = 10;
    $('#guessButton').text('Guess');
    $('#guessLeft').text('Please input your Numbers 0-9 with no repeating numbers');
    $("#guessOne").attr("class", "col-md-2 col-md-push-3 input");
    $("#guessTwo").attr("class", "col-md-2 col-md-push-3 input");
    $("#guessThree").attr("class", "col-md-2 col-md-push-3 input");
    $("#guessOne").val("");
    $("#guessTwo").val("");
    $("#guessThree").val("");
    debug("You have reset the game");
    getNewNumbers();
}

$(function() {
    getNewNumbers();
    $(document).on('click', '#guessButton', function() {
        if (!wonGame) {
            debug("Number One = " + numberOne + ". Number Two = " + numberTwo + ". Number Three = " + numberThree);
            if (guessCount > 0) {
                guessNumbers();
            } else {
                debug("You are out of guesses. The correct numbers was " + numberOne + " " + numberTwo + " " + numberThree + ".");
            }

        } else {
            resetGame();
        }
    });
});