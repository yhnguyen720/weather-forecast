var apiKey = "ff85c82019bc169c433101774a6ff69d";

$("#current-container").addClass("hide");
$("#forecast-container").addClass("hide");

$("#search").on("click", function (event) {
	event.preventDefault();
	var city = $("#city").val();
    $("#current-container").removeClass("hide");
	$("#forecast-container").removeClass("hide");

    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + apiKey;

    $.ajax({
        url: geoUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);  
        let lat = response[0].lat;
        let lon = response[0].lon;

        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function(response){
            console.log(response);
            let temp = response.main.temp;
            console.log(temp);
        });

        });

    });


