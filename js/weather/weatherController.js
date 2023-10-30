"use strict";

function setCurrentLocation() {

    const weather = model.inputs.mainPage.weather;

    function success(position) {
        weather.error = null;
        weather.location.lat = position.coords.latitude;
        weather.location.lon = position.coords.longitude;
        getForecast();
        updateView();
    }

    function error() {
        weather.error = "Unable to retrieve your location. Enable location permissions and reload.";
        weather.location.lat = null;
        weather.location.lon = null;
        updateView();
    }

    if (!navigator.geolocation) {
        weather.error = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
        });
    }

}

async function getForecast() {
    const {lat, lon} = model.inputs.mainPage.weather.location;
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`);
    const forecast = await response.json();
    setForecastInModel(forecast.properties.timeseries);
    setPrecipitationToday(forecast.properties.timeseries);
    updateView();
}

function setForecastInModel(forecast) {

    console.log(forecast);

    model.weather.forecastPerHour = [];

    model.weather.forecastPerHour.push({
        text: "Nå", // Nå
        symbol: forecast[0].data.next_1_hours.summary.symbol_code,
        temp: forecast[0].data.instant.details.air_temperature,
        wind: {
            speed: forecast[0].data.instant.details.wind_speed,
            direction: forecast[0].data.instant.details.wind_from_direction,
        }
    });
    model.weather.forecastPerHour.push({
        text: "1 time",
        symbol: forecast[1].data.next_1_hours.summary.symbol_code,
        temp: forecast[1].data.instant.details.air_temperature,
        wind: {
            speed: forecast[1].data.instant.details.wind_speed,
            direction: forecast[1].data.instant.details.wind_from_direction,
        }
    });
    model.weather.forecastPerHour.push({
        text: "3 timer",
        symbol: forecast[3].data.next_1_hours.summary.symbol_code,
        temp: forecast[3].data.instant.details.air_temperature,
        wind: {
            speed: forecast[3].data.instant.details.wind_speed,
            direction: forecast[3].data.instant.details.wind_from_direction,
        }
    });
    model.weather.forecastPerHour.push({
        text: "6 timer",
        symbol: forecast[6].data.next_1_hours.summary.symbol_code,
        temp: forecast[6].data.instant.details.air_temperature,
        wind: {
            speed: forecast[6].data.instant.details.wind_speed,
            direction: forecast[6].data.instant.details.wind_from_direction,
        }
    });
    model.weather.forecastPerHour.push({
        text: "12 timer",
        symbol: forecast[12].data.next_1_hours.summary.symbol_code,
        temp: forecast[12].data.instant.details.air_temperature,
        wind: {
            speed: forecast[12].data.instant.details.wind_speed,
            direction: forecast[12].data.instant.details.wind_from_direction,
        }
    });
}

function setPrecipitationToday(forecast) {
    let precipitation = 0;
    precipitation += forecast[0].data.next_6_hours.details.precipitation_amount;
    precipitation += forecast[6].data.next_6_hours.details.precipitation_amount;
    precipitation += forecast[12].data.next_6_hours.details.precipitation_amount;
    precipitation += forecast[18].data.next_6_hours.details.precipitation_amount;
    model.weather.precipitationToday = precipitation;
}

function getIconPath(symbol_code) {
    return `Icons/${model.weatherSymbolKeys[symbol_code]}`;
}