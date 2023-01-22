async function fetchWeatherData(location) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16962f48bc81e37b5f8eae8d6802cd48`, {mode: `cors`});
    const weatherData = await response.json();
    console.log(weatherData);
    } catch(error) {
        console.log(error);
    }
}

fetchWeatherData("toronto");