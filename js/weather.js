var apiKey = "zyGGGEL5WHRFlesPSaAPJ2nbYIYtuvcq";
var weather = [];
var currentLocation;
/*
 jQuery(document).ready(function($) {
     $("#searchtext").keyup(function() {
         getAutoCompleteValues($("#searchtext").val());

     });
     var callback;

     function getAutoCompleteValues(val) {

         if (val.length < 3) return false;
         $.ajax({
             type: "GET",
             dataType: "jsonp",
             jsonp: "callback",
             jsonpCallback: "callback",
             url: "http://apidev.accuweather.com/locations/v1/cities/autocomplete?apikey=hoArfRosT1215&q=" + val,
             cache: false,
             success: function(data) {
                 //alert(data);
                 $("#searchtext").autocomplete({
                     source: function(request, response) {
                         $.ajax({
                             url: "http://apidev.accuweather.com/locations/v1/cities/autocomplete?apikey=hoArfRosT1215&q=" + val,
                             type: "GET",
                             data: request,
                             success: function(data) {
                                 response($.map(data, function(data) {
                                     return {
                                         label: data.LocalizedName,
                                         value: data.AdministrativeArea.ID,
                                     };
                                 }));
                             }
                         });
                     },
                     select: function(event, ui) {
                         // Prevent value from being put in the input:
                         this.value = ui.item.label;
                         // Set the next input's value to the "value" of the item.
                         $(this).next("input").value(ui.item.value);
                         event.preventDefault();
                     }
                 });
             }
         });
     }


 });*/

$(function() {
    $("menuDropdown").click(function() {
        $("loctionDiv").toggle();
    });
    var val = ($("#searchtext").val());
    var options = {
        url: function(phrase) {
            return "https://apidev.accuweather.com/locations/v1/cities/autocomplete?apikey=hoArfRosT1215&q=" + ($("#searchtext").val());
        },
        ajaxSettings: {
            dataType: "jsonp",
            method: "GET",
            data: {
                dataType: "json"
            }
        },
        getValue: function(element) {

            currentLocation = (element.LocalizedName + ", " + element.AdministrativeArea.LocalizedName);
            return (element.LocalizedName + ", " + element.AdministrativeArea.LocalizedName);
        },

        list: {

            onSelectItemEvent: function() {
                var locationKey = $("#searchtext").getSelectedItemData().Key;
                $("#searchtext").val(locationKey).trigger("change");

                currentLocation = $("#searchtext").getSelectedItemData().LocalizedName + ", " + $("#searchtext").getSelectedItemData().AdministrativeArea.LocalizedName;
                $("#searchtext").val(locationKey).trigger("change");
                console.log(currentLocation);
                getWeather();
            }
        }
    };

    $("#searchtext").easyAutocomplete(options);
});

function getWeather() {

    var locationKey = ($("#searchtext").val());

    // return "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + ".json?language=en&apikey=hoArfRosT1215";
    //   $.getJSON("https://dataservice.accuweather.com/currentconditions/v1/" + locationKey + ".json?language=en&apikey=" + apiKey + "&details=true&callback=?", function(result) {


    $json_url = "https://dataservice.accuweather.com/currentconditions/v1/" + locationKey + ".json?language=en&apikey=" + apiKey + "&details=true&callback=?";

    $json = file_get_contents($json_url);
    $data = json_decode($json, TRUE);
    console.log(JSON.stringify($data));

    weather = result[0];
    console.log("Time: " + weather.LocalObservationDateTime);
    console.log("Temp: " + weather.Temperature.Imperial.Value + " F" + String.fromCharCode(176));
    $("#currentLocation").text(currentLocation);
});

}