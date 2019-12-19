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
                    var forecastTimes = [0, 7, 15, 31, 39];
                    var i;
                    for (i = 0; i < forecastTimes.length; i++) {
                        $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[forecastTimes].dt_txt + "</div>");
                        $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[forecastTimes].main.temp + "</div>");
                        $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[forecastTimes].main.humidity + "</div>");
                        $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[forecastTimes].weather[0].main + "</div>");
                        $('#forecastDisplay').append("<br>");
                    }


                    // Displaying FORECAST results
                    // $("#time1").text("Time: " + response.list[0].dt_txt);
                    // $("#temp1").text("Temperature: " + response.list[0].main.temp);
                    // $("#humidity1").text("Current Humidity: " + response.list[0].main.humidity);
                    // $("#icon1").text("icon: " + response.list[0].weather[0].main);

                    // $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[7].dt_txt + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[7].main.temp + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[7].main.humidity + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[7].weather[0].main + "</div>");

                    // $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[15].dt_txt + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[15].main.temp + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[15].main.humidity + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[15].weather[0].main + "</div>");

                    // $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[23].dt_txt + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[23].main.temp + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[23].main.humidity + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[23].weather[0].main + "</div>");

                    // $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[31].dt_txt + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[31].main.temp + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[31].main.humidity + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[31].weather[0].main + "</div>");

                    // $('#forecastDisplay').append("<div class='col-lg-2' id='time2'>" + "Time: " + response.list[39].dt_txt + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='temp2'>" + "Temp: " + response.list[39].main.temp + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='humidity2'>" + "Humidity: " + response.list[39].main.humidity + "</div>");
                    // $('#forecastDisplay').append("<div class='col-lg-2' id='icon2'>" + "Icon: " + response.list[39].weather[0].main + "</div>");

                });

        });


}



searchButton.on("click", getWeatherData);