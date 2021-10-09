window.onload = function () {

    document.getElementById("weatherSubmit").addEventListener("click", function (event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "") return;
        console.log(value);

        const key = "2d275781307ea1d7c2d58eb11dfec95d";

        const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + key;

        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);

                let results = "";

                if (json.cod === 200) {

                    document.getElementById("weatherHeading").innerHTML = "Current Weather In " + json.name;

                    results += '<div id="weatherHead" class="row">';
                    for (let i = 0; i < json.weather.length; i++) {
                        results += '<img id ="main-img" src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
                    }
                    results += '<h3>' + json.main.temp + " &deg;F</h3>";

                    /*
                    for (let i = 0; i < json.weather.length; i++) {
                        results += '<p>' + json.weather[i].description;
                        if (i !== json.weather.length - 1) {
                            results += ", ";
                        }
                        results += '</p>';

                    }
                    */
                    results += '</div>';

                    results += '<div class="row">';
                    results += '<div class="boxes">';
                    results += '<h3>High</h3>';
                    results += '<p>' + json.main.temp_max + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="boxes">';
                    results += '<h3>Low</h3>';
                    results += '<p>' + json.main.temp_min + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="boxes">';
                    results += '<h3>Humidity</h3>';
                    results += '<p>' + json.main.humidity + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="boxes">';
                    results += '<h3>Pressure</h3>';
                    results += '<p>' + json.main.pressure + " &deg;F</p>";
                    results += '</div>';


                    results += '<div class="boxes">';
                    results += '<h3>Wind speed</h3>';
                    results += '<p>' + json.wind.speed + " &deg;F</p>";
                    results += '</div>';
                    results += '</div>'


                }
                else {
                    document.getElementById("weatherHeading").innerHTML = "Unable to fetch data";
                }

                document.getElementById("weatherResults").innerHTML = results;
            });

        forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=" + key;
        fetch(forecastUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);

                let results = "";

                if (json.cod === "200") {

                    for (let i = 0; i < json.list.length; i++) {

                        if (i % 8 === 0) {

                            var date = new Date();
                            var currDay = date.getDay() + i / 8;
                            if (currDay > 7){
                              currDay = currDay % 7;
                            }
                            var dayOfWeek = getCurrDate(currDay);
                            results += '<h3>' + dayOfWeek + "</h3>";
                            results += '<div class="row">';

                        }

                        results += '<div class="box">';
                        results += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
                        results += '<h4>' + json.list[i].main.temp + " &deg;F</h4>";
                        results += '<p>high ' + json.list[i].main.temp_max + " &deg;F</p>";
                        results += '<p>wind ' + json.list[i].wind.speed + " mph</p>";
                        results += '<p>low ' + json.list[i].main.temp_min + " &deg;F</p>";
                        results += '<p>humidity ' + json.list[i].main.humidity + "%</p>";

                        results += '</div>';

                        if (i % 8 === 7) {
                            results += '</div>';
                        }
                    }

                    document.getElementById("forecastHeading").innerHTML = "Extended Forcast";
                    document.getElementById("extendedForcast").innerHTML = results;

                }
                else {
                    document.getElementById("forecastHeading").innerHTML = "City Data Not Found.";
                    document.getElementById("extendedForcast").innerHTML = "";
                }

            });

    });

    const getCurrDate = function (currDay) {

        var dayOfWeek;

        switch (currDay) {
            case 1: dayOfWeek = "MON";
                break;
            case 2: dayOfWeek = "TUES";
                break;
            case 3: dayOfWeek = "WED";
                break;
            case 4: dayOfWeek = "THURS";
                break;
            case 5: dayOfWeek = "FRI";
                break;
            case 6: dayOfWeek = "SAT";
                break;
            default: dayOfWeek = "SUN";
                break;
        }

        return dayOfWeek;
    }

}
