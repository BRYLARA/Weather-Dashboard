
function getLocation() {
    var x = document.getElementById("recent-search");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);

    var APIkey = "d95fc1da79853f3038b9424209b7d6ab"
    var uvWeatherURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey;
    var localWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d95fc1da79853f3038b9424209b7d6ab";

    // local code for local weather
    function localWeather() {
        $.ajax({
            url: localWeatherURL,
            method: "GET"
        }).then(function (localResponse) {
            console.log(localResponse);
          
            var localCity = localResponse.city.name;
            var localDate = localResponse.list[0].dt_txt;
            var localIcon = "https://openweathermap.org/img/w/" + localResponse.list[0].weather[0].icon + ".png";
            var localTemp = localResponse.list[0].main.temp;
            var localHumid = localResponse.list[0].main.humidity;
            var localWind = localResponse.list[0].wind.speed;
            $("#local-area").prepend(localCity);
            $("#local-date").prepend(localDate);
            $("#local-icon").attr("src", localIcon);
            $("#local-temp").prepend(localTemp);
            $("#local-humid").prepend(localHumid);
            $("#local-wind").prepend(localWind);

            // Get values for local 5 day forecast sections
            var localFiveDateOne = localResponse.list[1].dt_txt;
            var localFiveIconOne = "https://openweathermap.org/img/w/" + localResponse.list[1].weather[0].icon + ".png";
            var localFiveTempOne = localResponse.list[1].main.temp;
            var localFiveHumidOne = localResponse.list[1].main.humidity;
            $("#local-five-date-one").prepend(localFiveDateOne);
            $("#local-five-icon-one").attr("src", localFiveIconOne);
            $("#local-five-temp-one").prepend(localFiveTempOne);
            $("#local-five-humid-one").prepend(localFiveHumidOne);

            var localFiveDateTwo = localResponse.list[6].dt_txt;
            var localFiveIconTwo = "https://openweathermap.org/img/w/" + localResponse.list[6].weather[0].icon + ".png";
            var localFiveTempTwo = localResponse.list[6].main.temp;
            var localFiveHumidTwo = localResponse.list[6].main.humidity;
            $("#local-five-date-two").prepend(localFiveDateTwo);
            $("#local-five-icon-two").attr("src", localFiveIconTwo);
            $("#local-five-temp-two").prepend(localFiveTempTwo);
            $("#local-five-humid-two").prepend(localFiveHumidTwo);

            var localFiveDateThree = localResponse.list[14].dt_txt;
            var localFiveIconThree = "https://openweathermap.org/img/w/" + localResponse.list[14].weather[0].icon + ".png";
            var localFiveTempThree = localResponse.list[14].main.temp;
            var localFiveHumidThree = localResponse.list[14].main.humidity;
            $("#local-five-date-three").prepend(localFiveDateThree);
            $("#local-five-icon-three").attr("src", localFiveIconThree);
            $("#local-five-temp-three").prepend(localFiveTempThree);
            $("#local-five-humid-three").prepend(localFiveHumidThree);

            var localFiveDateFour = localResponse.list[22].dt_txt;
            var localFiveIconFour = "https://openweathermap.org/img/w/" + localResponse.list[22].weather[0].icon + ".png";
            var localFiveTempFour = localResponse.list[22].main.temp;
            var localFiveHumidFour = localResponse.list[22].main.humidity;
            $("#local-five-date-four").prepend(localFiveDateFour);
            $("#local-five-icon-four").attr("src", localFiveIconFour);
            $("#local-five-temp-four").prepend(localFiveTempFour);
            $("#local-five-humid-four").prepend(localFiveHumidFour);

            var localFiveDateFive = localResponse.list[30].dt_txt;
            var localFiveIconFive = "https://openweathermap.org/img/w/" + localResponse.list[30].weather[0].icon + ".png";
            var localFiveTempFive = localResponse.list[30].main.temp;
            var localFiveHumidFive = localResponse.list[30].main.humidity;
            $("#local-five-date-five").prepend(localFiveDateFive);
            $("#local-five-icon-five").attr("src", localFiveIconFive);
            $("#local-five-temp-five").prepend(localFiveTempFive);
            $("#local-five-humid-five").prepend(localFiveHumidFive);
        });
    }
    function localUv() {
        $.ajax({
            url: uvWeatherURL,
            method: "GET"
        }).then(function (localUV) {
            console.log(localUV);
            var localUvItem = localUV.value;
            $("#local-uv").prepend(localUvItem);
        });
    }

    localUv();

    localWeather();
}
getLocation();

// Get 5 day forecast when searching for city
var cities = [];
function citySearch() {

    $("#search-selected").css("display", "block");
    var cityinput = $("#search-field").val();
    console.log(cityinput);
    var value = $(this).data("name");
    var APIkey = "d95fc1da79853f3038b9424209b7d6ab"
    var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + value + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response2) {
        console.log(response2);

        var selectCity = response2.list[0].name;
        var selectIcon = "https://openweathermap.org/img/w/" + response2.list[0].weather[0].icon + ".png";
        var selectTemp = response2.list[0].main.temp;
        var selectHumid = response2.list[0].main.humidity;
        var selectWind = response2.list[0].wind.speed;
        $("#select-area").text(selectCity);
        $("#select-icon").attr("src", selectIcon);
        $("#select-temp").text(selectTemp);
        $("#select-humid").text(selectHumid);
        $("#select-wind").text(selectWind);

        var cityFiveDateOne = response2.list[1].dt_txt;
        var cityFiveIconOne = "https://openweathermap.org/img/w/" + response2.list[0].weather[0].icon + ".png";
        var cityFiveTempOne = response2.list[0].main.temp;
        var cityFiveHumidOne = response2.list[0].main.humidity;
        $("#city-five-icon-one").attr("src", cityFiveIconOne);
        $("#city-five-temp-one").text(cityFiveTempOne);
        $("#city-five-humid-one").text(cityFiveHumidOne);

        var cityFiveIconTwo = "https://openweathermap.org/img/w/" + response2.list[1].weather[0].icon + ".png";
        var cityFiveTempTwo = response2.list[1].main.temp;
        var cityFiveHumidTwo = response2.list[1].main.humidity;
        $("#city-five-icon-two").attr("src", cityFiveIconTwo);
        $("#city-five-temp-two").text(cityFiveTempTwo);
        $("#city-five-humid-two").text(cityFiveHumidTwo);

        var cityFiveIconThree = "https://openweathermap.org/img/w/" + response2.list[2].weather[0].icon + ".png";
        var cityFiveTempThree = response2.list[2].main.temp;
        var cityFiveHumidThree = response2.list[2].main.humidity;
        $("#city-five-icon-three").attr("src", cityFiveIconThree);
        $("#city-five-temp-three").text(cityFiveTempThree);
        $("#city-five-humid-three").text(cityFiveHumidThree);

        var cityFiveIconFour = "https://openweathermap.org/img/w/" + response2.list[3].weather[0].icon + ".png";
        var cityFiveTempFour = response2.list[3].main.temp;
        var cityFiveHumidFour = response2.list[3].main.humidity;
        $("#city-five-icon-four").attr("src", cityFiveIconFour);
        $("#city-five-temp-four").text(cityFiveTempFour);
        $("#city-five-humid-four").text(cityFiveHumidFour);

        var cityFiveIconFive = "https://openweathermap.org/img/w/" + response2.list[4].weather[0].icon + ".png";
        var cityFiveTempFive = response2.list[4].main.temp;
        var cityFiveHumidFive = response2.list[4].main.humidity;
        $("#city-five-icon-five").attr("src", cityFiveIconFive);
        $("#city-five-temp-five").text(cityFiveTempFive);
        $("#city-five-humid-five").text(cityFiveHumidFive);

    });

}

var retrieveHistory = localStorage.getItem("Search Result");


if (retrieveHistory) {
    cities = retrieveHistory.split(",");
    renderButtons();
}

// Clear Search History 
$("#clear-history").click(function () {
    localStorage.clear();
    cities = [];
    $("button.city-name").remove();
});


// Function for displaying recent searches
function renderButtons() {

    $("#recent-search").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        var a = $("<button>");
        a.addClass("city-name");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);

        var history = localStorage.getItem("Search Result") || 0;
        localStorage.setItem("Search Result", cities);

        $("#recent-search").append(a);
    }
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-field").val().trim();
    var savedCity = $("#search-field").val().trim();


    cities.push(city);

    renderButtons();
});

$(document).on("click", ".city-name", citySearch);

renderButtons();