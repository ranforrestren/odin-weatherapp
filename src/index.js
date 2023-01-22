import './style.css';

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16962f48bc81e37b5f8eae8d6802cd48&units=metric`, {mode: `cors`});
        const rawWeatherData = await response.json();
        console.log(rawWeatherData);
        const weatherData = weatherDataFactory(rawWeatherData);
        console.log(weatherData);
        injectWeatherData(weatherData);
    } catch(error) {
        console.log(error);
    }
}

const weatherDataFactory = (rawWeatherData) => {
    return {
        weather: rawWeatherData.weather,
        temp: rawWeatherData.main.temp,
        feels_like: rawWeatherData.main.feels_like,
        humidity: rawWeatherData.main.humidity,
        wind: rawWeatherData.wind.speed,
    }
}

function injectWeatherData(weatherData) {
    const weatherElem = document.querySelector("#weather");
    const temperatureElem = document.querySelector("#temperature");
    const feelslikeElem = document.querySelector("#feels_like");
    const humidityElem = document.querySelector("#humidity");
    const windElem = document.querySelector("#wind");
    weatherElem.textContent = "Weather: " + weatherData.weather[0].main;
    temperatureElem.textContent = "Temperature: " + weatherData.temp;
    feelslikeElem.textContent = "Feels like: " + weatherData.feels_like;
    humidityElem.textContent = "Humidity: " + weatherData.humidity;
    windElem.textContent = "Wind: " + weatherData.wind;
}

fetchWeatherData("toronto");