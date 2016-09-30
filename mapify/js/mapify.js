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
var currentLocation = "Paintsville, Ky";
var debug = true;
var flipped = false;

function log(msg) {
    if (debug) {
        console.log(msg);
    }
}

var map;


function addLocation() {

    if (widgetId < 9) {
        $('<div class="col-md-3" style="text-decoration:none; overflow:hidden; height:400px; max-width:100%;">' +
            '<div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">' +
            '<button id="btnClose" class="btn btn-danger pull-right glyphicon glyphicon-remove closebutton col-md-12" >' +
            'Move, Get out the Way</button>' +
            '<iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=' + currentLocation + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU">' +
            '</iframe>' +
            '</div>' +
            '<a class="code-for-google-map" rel="nofollow" id="get-data-for-map"></a>' +
            '<style>' +
            '#gmap-canvas img {' +
            '   max-width: none!important;' +
            '   background: none!important;' +
            '    font-size: inherit;' +
            '}' +
            '</style>' +
            '</div>'
        ).appendTo("#appDiv");


        widgetId++;

    }


}



$(function() {

    //Stores Widget into localStorage for loading later
    $("#addLocation").click(function() {
        addLocation();
    });
    //Delete the selected Widget
    $(document).on('click', '#btnClose', function() {
        $(this).closest('div.col-md-3').remove();
        widgetId--;
    });
    // Autocompletes and searchs for your location
    $("#searchLocation").keyup(function() {
        $("#searchLocation").geocomplete().bind(
            "geocode:result",
            function(event, result) {
                log("Search Location Result : " + result);
                $("#searchLocation").geocomplete({
                    details: ".geo-details",
                    detailsAttribute: "data-geo"
                });
                currentLocation = result.formatted_address.substring(
                    0, 23);
                $("#currentLocation").text(currentLocation);
                log("Current Location is : " +
                    currentLocation);
                lat = (result.geometry.location.lat());
                log(lat);
                lng = (result.geometry.location.lng());
                log(lng);

                map = new google.maps.Map($('map'), {
                    center: {
                        lat: lat,
                        lng: lng
                    },
                    zoom: 8
                });
            });
    });
});