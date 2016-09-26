var apiKey = "AIzaSyCyDoP0qIBeGe2sbs46oiMw6a85KaZomz8";
var darkSkyKey = "c015e5c71c4c3a10984c8b75d64974d3";
var backupDarkSkyKey = "32ed40b1ffc8fa6974c14667f27f3205";
var val = ($("#searchLocation").val());
var lastLocation = localStorage['lastLocation'];
var lastLat = localStorage['lastLat'];
var lastLng = localStorage['lastLng'];
var weatherUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var darkSkyUrl = "https://api.darksky.net/forecast/" + darkSkyKey + "/";
var lat;
var lng;
var hidden = true;
var widgetId = 1;
var divTemp;
var icon;
var savedLocations = JSON.parse(localStorage.getItem(['localStorage']) || null);
var currentLocation = "";
var debug = false;
var flipped = false;

function log(msg) {
    if (debug) {
        console.log(msg);
    }
}
$(function() {



    //Load all saved locations
    //localStorage.clear() //removeItem(); //'savedLocations'
    if (Storage.length != null) {
        for (var i = 0; i < (Storage.length - 3); i++) {
            console.log(localStorage.key(i));
        }
        i = localStorage.length - 2;
        (function theLoop(i) {
            setTimeout(function() {
                if (--i) {
                    savedLocations = localStorage.getItem('savedLocations[' + (i) + ']') || [];
                    savedLocations = JSON.parse(savedLocations);
                    name = savedLocations[0].name;
                    lat = savedLocations[0].lat;
                    lng = savedLocations[0].lng;
                    id = i;

                    log("Loading  : Name = " + name + " Lat = " + lat + " Long = " + lng + " Id = " + i);
                    getWeather(name, lat, lng, i);
                    widgetId++;
                    theLoop(i); // Call the loop again, and pass it the current value of i

                }
            }, 10);
        })(i);
    }



    log("Local Storage : " + localStorage);
    $("#currentLocation").text(lastLocation);
    getWeather(lastLocation, lastLat, lastLng);


    //Drops the Widget Bar Down
    $("#menuDropdown").click(function() {
        $("#locationDiv").animate({ width: 'toggle' }, "slow");
    });


    //Stores Widget into localStorage for loading later
    $("#addLocation").click(function() {
        getWeather(currentLocation, lat, lng, widgetId);
        //addLocation(currentLocation, lat, lng, widgetId);
        var oldItems = oldItems === "null" ? [] :
            savedLocations = localStorage.getItem('savedLocations[' + widgetId + '][0]') || [];

        var newItem = {
            'name': currentLocation,
            'lat': lat,
            'lng': lng,
        }


        oldItems.push(newItem);

        localStorage.setItem((('savedLocations[' + widgetId + ']')), JSON.stringify(oldItems));
        widgetId++;

        /////FIGURED OUT SAVING. Around 10 hours of testing and errors.
        log(("Testing " + (widgetId - 1) + "[0] : " + localStorage['savedLocations[' + (widgetId - 1) + ']']));
        var testing = JSON.parse(localStorage['savedLocations[' + (widgetId - 1) + ']']);
        log(testing[0].lat); /////FIGURED OUT SAVING. Around 10 hours of testing and errors.
        log("Local Storage Contents : " + localStorage);
    });


    //Delete the selected Widget
    $(document).on('click', '#btnClose', function() {
        element = $(this).closest('div[id]').attr('id');
        log("Removoving : 'savedLocations[" + $(this).closest('div[id]').attr('id') + "]'");
        localStorage.removeItem(['savedLocations[' + $(this).closest('div[id]').attr('id') + ']']);
        log("Local Storage Contents : " + localStorage);
        $(this).closest('div').remove();
    });


    //Flip between daily and weekly
    $(".card").flip({
        trigger: 'manual'
    });

    $('.flip').click(function() {
        if (!flipped) {
            $('.card').flip(true);
            flipped = true;
        } else {
            $('.card').flip(false);
            flipped = false;
        }
    });

    //Load Widget Location into main Location
    $(document).on('click', '.weatherSidebar', function() {
        var lat = $(this).attr('lat');
        var lng = $(this).attr('lng');
        var name = $(this).attr('name');
        $("#currentLocation").text(name);

        getWeather(name, lat, lng);
    });

    // Autocompletes and searchs for your location
    $("#searchLocation").keyup(function() {
        $("#searchLocation").geocomplete().bind("geocode:result", function(event, result) {
            log("Search Location Result : " + result);
            $("#searchLocation").geocomplete({
                details: ".geo-details",
                detailsAttribute: "data-geo"
            });

            currentLocation = result.formatted_address.substring(0, 23);
            $("#currentLocation").text(currentLocation);
            log("Current Location is : " + currentLocation);
            lat = (result.geometry.location.lat());
            lng = (result.geometry.location.lng());

            getWeather(currentLocation, lat, lng);
        });
    });
});


function addLocation(name, lat, lng, widgetId, divTemp) {

    //Stores the Location into the Widget bar
    $('<div/>', {
        id: widgetId,
        class: 'weatherSidebar widgetText',
        text: currentLocation === "null" ? "Unknown" : (name.substring(0, 22) + "     " + divTemp + String.fromCharCode(176) + "F"),
        lat: lat,
        lng: lng,
        name: name

    }).appendTo('#widgets');
    $('<button/>', {
        id: 'btnClose',
        class: 'btn btn-danger pull-right glyphicon glyphicon-remove closebutton',

    }).appendTo('#' + widgetId);
    log(widgetId);

    $('#' + widgetId).css({ "background": "url(./img/" + getBackground(icon) + ".jpg) no-repeat", });

}

//Sets the Last Location Loaded into the localStorage
function populateStorage(currentLocation, lat, lng) {
    localStorage.setItem('lastLocation', currentLocation);
    localStorage.setItem('lastLat', lat);
    localStorage.setItem('lastLng', lng);

}


//Gets the Last Location Loaded into the localStorage
function setLocation() {
    var lastLocation = localStorage.getItem('lastLocation');
    $('lastLocation').value = lastLocation;
    var lastLat = localStorage.getItem('lastLat');
    $('lastLat').value = lastLat;
    var lastLng = localStorage.getItem('lastLng');
    $('lastLng').value = lastLng;

}
//Set the Background Image
function getBackground(icon) {
    switch (icon) {
        case 'clear-day':
            icon = "sunny";
            break;
        case 'clear-night':
            icon = "calm-night";
            break;
        case 'wind':
            icon = "windy";
            break;
        case 'fog':
            icon = "atmosphere";
            break;
        case 'partly-cloudy-day':
            icon = "cloudy";
            break;
        case 'partly-cloudy-night':
            icon = "cloudy-night";
            break;
    }
    return icon;
}

function getWeather(name, lat, lng, widgetId) {
    //Set Last location loaded
    populateStorage(name, lat, lng);

    //Get Weather
    $.ajax({
        url: darkSkyUrl + lat + "," + lng,
        dataType: "jsonp",
        success: function(result) {

            icon = result.currently.icon;
            background = getBackground(icon);
            log((result));

            //Set the Side Widgets
            if (widgetId > 0) {
                divTemp = parseInt(result.currently.temperature);
                addLocation(name, lat, lng, widgetId, divTemp);
            } else {

                //Set current weather page

                $("#tempText").text(parseInt(result.currently.temperature) + String.fromCharCode(176) + "F");
                $("#statusText").text(result.currently.summary);
                log(result.daily);
                $("#minTemp").text(parseInt(result.daily.data[0].temperatureMin) + String.fromCharCode(176) + "F");
                $("#maxTemp").text(parseInt(result.daily.data[0].temperatureMax) + String.fromCharCode(176) + "F");
                $("#percipChance").text(parseInt(result.daily.data[0].precipProbability * 100) + "%");
                $('#appDiv').css({ "background": "url(./img/" + background + ".jpg) no-repeat", });



                //Set Weekly data

                $("#monday").text("Monday : " + result.daily.data[0].summary + " " + parseInt(result.daily.data[0].temperatureMax) + String.fromCharCode(176) + "F");
                $("#monday").css({ "background": "url(./img/" + getBackground(result.daily.data[0].icon) + ".jpg) no-repeat", });
                $("#tuesday").text("Tuesday : " + result.daily.data[1].summary + " " + parseInt(result.daily.data[1].temperatureMax) + String.fromCharCode(176) + "F");
                $("#tuesday").css({ "background": "url(./img/" + getBackground(result.daily.data[1].icon) + ".jpg) no-repeat", });
                $("#wenesday").text("Wenesday : " + result.daily.data[2].summary + " " + parseInt(result.daily.data[2].temperatureMax) + String.fromCharCode(176) + "F");
                $("#wenesday").css({ "background": "url(./img/" + getBackground(result.daily.data[2].icon) + ".jpg) no-repeat", });
                $("#thursday").text("Thursday : " + result.daily.data[3].summary + " " + parseInt(result.daily.data[3].temperatureMax) + String.fromCharCode(176) + "F");
                $("#thursday").css({ "background": "url(./img/" + getBackground(result.daily.data[3].icon) + ".jpg) no-repeat", });
                $("#friday").text("Friday : " + result.daily.data[4].summary + " " + parseInt(result.daily.data[4].temperatureMax) + String.fromCharCode(176) + "F");
                $("#friday").css({ "background": "url(./img/" + getBackground(result.daily.data[4].icon) + ".jpg) no-repeat", });
                $("#saturday").text("Saturday : " + result.daily.data[5].summary + " " + parseInt(result.daily.data[5].temperatureMax) + String.fromCharCode(176) + "F");
                $("#saturday").css({ "background": "url(./img/" + getBackground(result.daily.data[5].icon) + ".jpg) no-repeat", });
                $("#sunday").text("Sunday : " + result.daily.data[6].summary + " " + parseInt(result.daily.data[6].temperatureMax) + String.fromCharCode(176) + "F");
                $("#sunday").css({ "background": "url(./img/" + getBackground(result.daily.data[6].icon) + ".jpg) no-repeat", });
            }
        }
    });
}