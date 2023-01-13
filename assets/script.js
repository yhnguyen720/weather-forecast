var apiKey = "ff85c82019bc169c433101774a6ff69d";
var today = dayjs();

$("#date").text(today.format("dddd, MMMM D"));
$("#current-container").addClass("hide");
        
$("#search").on("click", function (event) {
	event.preventDefault();
	var city = $("#city").val();

    $("#current-container").removeClass("hide");

    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + apiKey;

    $.ajax({
        url: geoUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);  
        let lat = response[0].lat;
        let lon = response[0].lon;

        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function(response){
    
            const weatherList = response.list.map((item) => {
                return {
                    temp: item.main.temp,
                    icon: item.weather[0].icon,
                    humid: item.main.humidity,
                    wind: item.wind.speed
                }
            })

            var iconUrl = "http://openweathermap.org/img/wn/" + weatherList[0].icon + ".png"

            $("#current-container").addClass("card border-primary p-2 shadow")
            $("#current-container").append($("<h5>").addClass("text-capitalize").text(city));
            $("#current-container").append($("<img>").addClass("icon").attr("src", iconUrl));
            $("#current-container").append($("<p1>").text("Temperature: " + weatherList[0].temp + " \u00B0F"));
            $("#current-container").append($("<p1>").text("Humidity: " + weatherList[0].humid + "%"));
            $("#current-container").append($("<p1>").text("Wind Speed: " + weatherList[0].wind + " MPH"));

            

            $.each(weatherList, function(i) {
                if (i !== 0)
                    {
                        var forecasticonUrl = "http://openweathermap.org/img/wn/" + weatherList[i].icon + ".png"

                        const forecast = 
                            `<div class="card">
                                <h5> ${date} </h5>
                                <img class = "icon" src="${forecasticonUrl}" />
                                <p1> ${weatherList[i].temp} \u00B0F </p1>
                                <p1> ${weatherList[i].humid} % </p1>
                                <p1> ${weatherList[i].wind} MPH </p1>
                            </div>`
                    
                        $("#forecast-container").append(forecast);
                    }
            })

            
          
           

            

        
            
            






                })
            })
        });



