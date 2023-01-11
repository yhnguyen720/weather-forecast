var apiKey = "ff85c82019bc169c433101774a6ff69d";
var today = dayjs();

$("#date").text(today.format("dddd, MMMM D"));
        
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

        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function(response){
            console.log(response);
            let temp = response.main.temp;
            let icon = response.weather[0].icon;
            let humidity = response.main.humidity;
            let wind = response.wind.speed;

            var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            $("#currentcity").text(city);
            $("#icon").attr("src",iconUrl);
            $(".temp").text(temp);
            $(".wind").text(wind);
            $(".humid").text(humidity);

            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=" + apiKey + "&units=imperial";

            $.ajax({
                url: forecastUrl,
                method: "GET",
            }).then(function(response){
                console.log(response);

                const tempList = response.list.map((item) => {
                    return {
                        temp: item.main.temp
                    }
                })
                console.log(tempList);

                const iconList = response.list.map((item) => {
                    return {
                        icon: item.weather[0].icon
                    }
                })
                console.log(iconList);

                const humidList = response.list.map((item) => {
                    return {
                        humid: item.main.humidity
                    }
                })
                console.log(humidList);

                const windList = response.list.map((item) => {
                    return {
                        wind: item.wind.speed
                    }
                })
                console.log(windList);
    






                })

                


            })
        });
        });


