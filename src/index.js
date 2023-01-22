import './style.css';

const inputField = document.querySelector("#location");
const searchButton = document.querySelector("#searchButton")

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16962f48bc81e37b5f8eae8d6802cd48&units=metric`, { mode: `cors` });
        const rawWeatherData = await response.json();
        console.log(rawWeatherData);
        const weatherData = weatherDataFactory(rawWeatherData);
        console.log(weatherData);
        injectWeatherData(weatherData);
    } catch (error) {
        console.log(error);
    }
}

const weatherDataFactory = (rawWeatherData) => {
    return {
        name: rawWeatherData.name,
        weather: rawWeatherData.weather,
        temp: rawWeatherData.main.temp,
        feels_like: rawWeatherData.main.feels_like,
        humidity: rawWeatherData.main.humidity,
        wind: rawWeatherData.wind.speed,
    }
}

function injectWeatherData(weatherData) {
    const nameElem = document.querySelector("#name")
    const weatherElem = document.querySelector("#weather");
    const temperatureElem = document.querySelector("#temperature");
    const feelslikeElem = document.querySelector("#feels_like");
    const humidityElem = document.querySelector("#humidity");
    const windElem = document.querySelector("#wind");
    const background = document.querySelector('body');
    nameElem.textContent = weatherData.name;
    temperatureElem.textContent = Math.round(weatherData.temp) + "°C";
    weatherElem.textContent = weatherData.weather[0].description;
    feelslikeElem.textContent = Math.round(weatherData.feels_like) + "°C";
    humidityElem.textContent = weatherData.humidity + "%";
    windElem.textContent = weatherData.wind + "m/s";
    background.className = "";
    switch (weatherData.weather[0].main) {
        case "Thunderstorm":
            background.classList.add("thunderstorm");
            break;
        case "Drizzle":
            background.classList.add("drizzle");
            break;
        case "Rain":
            background.classList.add("rain");
            break;
        case "Snow":
            background.classList.add("snow");
            break;
        case "Clear":
            background.classList.add("clear");
            break;
        case "Clouds":
            background.classList.add("clouds");
            break;
        default:
            background.classList.add("atmosphere");
    }
}

fetchWeatherData("toronto");

console.log(inputField);

searchButton.addEventListener("click", () => {
    const input = inputField.value;
    fetchWeatherData(input);
});