const apiKey = "ff85c82019bc169c433101774a6ff69d";
const today = dayjs();

$("#date").text(today.format("dddd, M/D"));

$("#search").on("click", startApp)

function startApp(){
    $("#current-container").empty();
    $("#forecast-container").empty();

    currentCity();
};

function currentCity(){
	
    const city = $("#city").val();

    const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + apiKey;

    $.ajax({
        url: geoUrl,
        method: "GET",
    }).then(function (response) {  
        let lat = response[0].lat;
        let lon = response[0].lon;

        const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function(response){
    
            const weatherList = response.list.map((item) => {
                return {
                    temp: parseInt(item.main.temp),
                    icon: item.weather[0].icon,
                    humid: parseInt(item.main.humidity),
                    wind: parseInt(item.wind.speed)
                }
            })

            const iconUrl = "http://openweathermap.org/img/wn/" + weatherList[0].icon + ".png"

            $("#current-container").addClass("card border-primary p-2 shadow")
            $("#current-container").append($("<h5>").addClass("text-capitalize").text(city));
            $("#current-container").append($("<img>").addClass("icon").attr("src", iconUrl));
            $("#current-container").append($("<p1>").text("Temperature: " + weatherList[0].temp + " \u00B0F"));
            $("#current-container").append($("<p1>").text("Humidity: " + weatherList[0].humid + "%"));
            $("#current-container").append($("<p1>").text("Wind: " + weatherList[0].wind + " MPH"));

            $.each(weatherList, function(i) {
                if (i !== 0)
                    {var forecasticonUrl = "http://openweathermap.org/img/wn/" + weatherList[i].icon + ".png"
                    var futureDate = today.add(i, 'day').format("dddd, M/D");
                    
                    const forecast = 
                        `<div class="flex-container">
                            <div class="card border-primary shadow p-2">
                                <p1> ${futureDate} </p1>
                                <img class = "icon-forecast" src="${forecasticonUrl}" />
                                <p1> Temperature: ${weatherList[i].temp} \u00B0F </p1>
                                <p1> Humidity: ${weatherList[i].humid} % </p1>
                                <p1> Wind: ${weatherList[i].wind} MPH </p1>
                            </div>
                        </div>`
                    
                    $("#forecast-container").append(forecast);
                    }
            })
        })
    })

    savedCity();

};

function savedCity(){

    


}

