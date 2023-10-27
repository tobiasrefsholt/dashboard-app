"use strict";

/* function setCurrentLocation() {

    const currentLocation = model.inputs.mainPage.weather;

    function success(position) {
        currentLocation.error = null;
        currentLocation.location.lat = position.coords.lat;
        currentLocation.location.lon = position.coords.lon;
        getForecast();
        updateView();
    }

    function error() {
        currentLocation.error = "Unable to retrieve your location";
        currentLocation.location.lat = null;
        currentLocation.location.lon = null;
        updateView();
    }

    if (!navigator.geolocation) {
        currentLocation.error = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

} */

async function getForecast() {
    const {lat, lon} = model.inputs.mainPage.weather.location;
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`);
    const forecast = await response.json();
    setForecastInModel(forecast.properties.timeseries);
    updateView();
}

function setForecastInModel(forecast) {

    model.weather = [];

    model.weather.push({
        text: null, // Nå
        symbol: forecast[0].data.next_1_hours.summary.symbol_code,
        temp: forecast[0].data.instant.details.air_temperature,
        wind: {
            speed: forecast[0].data.instant.details.wind_speed,
            direction: forecast[0].data.instant.details.wind_from_direction,
        }
    });
    model.weather.push({
        text: "1 time",
        symbol: forecast[1].data.next_1_hours.summary.symbol_code,
        temp: forecast[1].data.instant.details.air_temperature,
        wind: {
            speed: forecast[1].data.instant.details.wind_speed,
            direction: forecast[1].data.instant.details.wind_from_direction,
        }
    });
    model.weather.push({
        text: "3 timer",
        symbol: forecast[3].data.next_1_hours.summary.symbol_code,
        temp: forecast[3].data.instant.details.air_temperature,
        wind: {
            speed: forecast[3].data.instant.details.wind_speed,
            direction: forecast[3].data.instant.details.wind_from_direction,
        }
    });
    model.weather.push({
        text: "6 timer",
        symbol: forecast[6].data.next_1_hours.summary.symbol_code,
        temp: forecast[6].data.instant.details.air_temperature,
        wind: {
            speed: forecast[6].data.instant.details.wind_speed,
            direction: forecast[6].data.instant.details.wind_from_direction,
        }
    });
    model.weather.push({
        text: "12 timer",
        symbol: forecast[12].data.next_1_hours.summary.symbol_code,
        temp: forecast[12].data.instant.details.air_temperature,
        wind: {
            speed: forecast[12].data.instant.details.wind_speed,
            direction: forecast[12].data.instant.details.wind_from_direction,
        }
    });
}

function getIconPath(symbol_code) {
    return `Icons/${model.weatherSymbolKeys[symbol_code]}`;
}