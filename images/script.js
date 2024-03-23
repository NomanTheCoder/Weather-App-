const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_icon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function checkweather(cityName) {
    const api_key = "b125f2bd1a47d7d72cdd0800e85b912e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const weather_data = await response.json();
        
        const temperatureCelsius = Math.round(weather_data.main.temp - 273.15);
        
        city.textContent = weather_data.name;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${weather_data.wind.speed} Km/h`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_icon.src = "clouds.png";
                break;
            case 'Clear':
                weather_icon.src = "clear.png";
                break;
            case 'Rain':
                weather_icon.src = "rain.png";
                break;
            case 'Mist':
                weather_icon.src = "mist.png";
                break;
            case 'Snow':
                weather_icon.src = "snow.png";
                break;
            default:
                weather_icon.src = "default.png"; 
        }

        
        temp.innerHTML = `${temperatureCelsius}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
  
    }
}

searchBtn.addEventListener('click', () => {
    checkweather(inputBox.value);
});
