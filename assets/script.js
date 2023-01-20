const apiKey = "ff85c82019bc169c433101774a6ff69d";

//dayjs to format date
const today = dayjs();
$("#date").text(today.format("dddd, M/D"));

const searchHistory = [];

//define city when search button is clicked, use city as input for currentWeather function
$("#search").on("click", function(event) {
    event.preventDefault();

    const city = $("#city").val()
    
    currentWeather(city);
    
    //save all past city inputs into an array and append as individual buttons into history container
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        const searchedCity = `<div class="shorter">
        <button class="button is-info is-light is-fullwidth is-capitalized searchedCity"> ${city} </button>
        <br>
        </div>`
        $("#history").append(searchedCity);
    };

    //set localStorage with array of all past city inputs
    localStorage.setItem("city", JSON.stringify(searchHistory));
})

//when user clicks on a city button in history container, weather conditions of selected city is displayed
$(document).on("click", ".searchedCity", function() {
    const pastCity = $(this).text();
    currentWeather(pastCity);
})

//function to retrieves current weather conditions
function currentWeather(city) {

    //passes city input into first url to retrieve geographical coordinates
    const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + apiKey;

    $.ajax({
        url: geoUrl,
        method: "GET",
    }).then(function (response) {  

        $("#current-container").empty();
        $("#forecast-container").empty();

        const lat = response[0].lat;
        const lon = response[0].lon;

        //passes geo coordinates into second url to retrieve weather 
        const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function(response){
    
            //creates array of desired weather info
            const weatherList = response.list.map((item) => {
                return {
                    temp: parseInt(item.main.temp),
                    icon: item.weather[0].icon,
                    humid: parseInt(item.main.humidity),
                    wind: parseInt(item.wind.speed)
                }
            })

            forecastWeather(weatherList);

            const iconUrl = "https://openweathermap.org/img/wn/" + weatherList[0].icon + ".png"

            //creates weather container and append current weather conditions
            $("#current-container").addClass("card p-4 border has-background-info-light m-4 has-text-centered")
            $("#current-container").append($("<h5>").addClass("is-capitalized is-size-5 bold").text(city));
            $("#current-container").append($("<img>").addClass("icon").attr("src", iconUrl));
            $("#current-container").append($("<br>"));
            $("#current-container").append($("<p1>").text("Temperature: " + weatherList[0].temp + " \u00B0F"));
            $("#current-container").append($("<br>"));
            $("#current-container").append($("<p1>").text("Humidity: " + weatherList[0].humid + "%"));
            $("#current-container").append($("<br>"));
            $("#current-container").append($("<p1>").text("Wind: " + weatherList[0].wind + " MPH"));
           
        })
    })
};

//function to create forecast cards and append weather info from array created in last function 
function forecastWeather(weatherList) {
    $.each(weatherList, function(i) {
        if (i !== 0)
            {const forecasticonUrl = "https://openweathermap.org/img/wn/" + weatherList[i].icon + ".png"
            
            const futureDate = today.add(i, 'day').format("dddd, M/D");
            
            const forecast = 
                `<div class="flex-container pt-4 pb-4">
                    <div class="card p-4 border has-background-info-light">
                        <p1 class="bold"> ${futureDate} </p1>
                        <br>
                        <img class = "icon-forecast" src="${forecasticonUrl}" />
                        <br>
                        <p1> Temperature: ${weatherList[i].temp} \u00B0F </p1>
                        <br>
                        <p1> Humidity: ${weatherList[i].humid} % </p1>
                        <br>
                        <p1> Wind: ${weatherList[i].wind} MPH </p1>
                    </div>
                </div>`
            
            $("#forecast-container").append(forecast);
            }
    })
}

