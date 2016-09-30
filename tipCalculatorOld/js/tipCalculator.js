var debugEnabled = true;
$(function() {

    $('#billAmount').focusout(function(event) {

        var text = $('#billAmount').val() == "" ? 0.00 : parseFloat($('#billAmount').val());
        $(this).val((text).toFixed(2));
        debug(text);
        if (event.which <
            46 || event.which > 59) { event.preventDefault(); } // prevent if not number/dot 
        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            event.preventDefault();
        }
    });
    $('#calculate').click(function(event) {
        calculateTip();
    });
});

function debug(msg) {
    if (debugEnabled) {
        console.log(msg);
    }
}

function calculateTip() {
    var billAmount = $('#billAmount').val();
    var peopleSharing = $('#peopleSharing').val();
    var dropDown = $('#dropDown').val();
    if (billAmount == "" || peopleSharing == "") {
        debug("Check");
        $('#tipAmount').text("Please Complete all Fields");
    } else {
        billAmount = billAmount == "" ? "0.00" : billAmount;
        peopleSharing = peopleSharing == "" ? "1" : peopleSharing;

        debug(billAmount);
        debug(dropDown);
        debug(peopleSharing);
        var total = billAmount * dropDown / peopleSharing;

        $('#tipAmount').text("Total amount of tip for each person " + total.toFixed(2))
    }
}

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