var searchButton = $("#searchButton");
var apiKey = '&APPID=6ed916bd27627a41b866c99f280877b5';
var units = '&units=imperial';





function getWeatherData() {
    // current weather
    var openWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var citySearch = $('#citySearchInput').val();
    var currentWeather = openWeather + citySearch + units + apiKey;


    $.ajax({
        url: currentWeather,
        method: "GET"
    })
        .then(function (response) {

            console.log("Latitude: " + response.coord.lat);
            console.log("Longitude: " + response.coord.lon);
            console.log("City: " + response.name);
            console.log("Current Temperature: " + response.main.temp);
            console.log("Current Humidity: " + response.main.humidity);
            console.log("Current Wind Speed: " + response.wind.speed);

            var lat = Math.floor(response.coord.lat);
            var lon = Math.floor(response.coord.lon);


            // Displaying results
            $("#cityNameDisplay").html("<h3>City: " + response.name + "</h3>");
            $("#windSpeedDisplay").text("Current Wind Speed: " + response.wind.speed);
            $("#humidityDisplay").text("Current Humidity: " + response.main.humidity);
            $("#temperatureDisplay").text("Current Temperature: " + response.main.temp);


            // UV search using lat and lon
            var uvSearchURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&amp;lon=' + lon;
            var uvSearchKey = uvSearchURL + apiKey;

            $.ajax({
                url: uvSearchKey,
                method: "GET"
            })
                .then(function (response) {

                    console.log("Current UV Index: " + response.value);
                    $('#uvIndexDisplay').text("Current UV Index: " + response.value)

                });


            // forecast search
            var weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
            var citySearch = $('#citySearchInput').val();
            var forecastURL = weatherForecast + citySearch + units + apiKey;

            $.ajax({
                url: forecastURL,
                method: "GET"
            })
                .then(function (response) {

                    console.log('DAY 1');

                    console.log("Time: " + response.list[0].dt_txt);
                    console.log("Temp: " + response.list[0].main.temp);
                    console.log("Humidity: " + response.list[0].main.humidity);
                    console.log("Icon: " + response.list[0].weather[0].main);

                    // Displaying FORECAST results
                    $("#time1").text("Time: " + response.list[0].dt_txt);
                    $("#temp1").text("Temperature: " + response.list[0].main.temp);
                    $("#humidity1").text("Current Humidity: " + response.list[0].main.humidity);
                    $("#icon1").text("Conditions: " + response.list[0].weather[0].main);


                    console.log('DAY 2');

                    console.log("Time: " + response.list[8].dt_txt);
                    console.log("Temp: " + response.list[8].main.temp);
                    console.log("Humidity: " + response.list[8].main.humidity);
                    console.log("Icon: " + response.list[8].weather[0].main);

                });

        });


}


// UV search using lat and lon
// uvSearchURL = 'api.openweathermap.org/data/2.5/uvi?lat=' + response.coord.lat + '&amp;lon=' + response.coord.lon


searchButton.on("click", getWeatherData);