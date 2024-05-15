const locationForm = document.querySelector('#location-form');
const locationInput = document.querySelector('#location');
const weatherInfo = document.querySelector('#weather-info');

locationForm.addEventListener('submit', fetchWeather);

function fetchWeather(e) {
  e.preventDefault();
  
  const location = locationInput.value.trim();
  if (!location) return;

  const apiKey = '3d22b15240fef597ae2abae75bd4de90'; // 
  const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${location}&units=metric&appid=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.list && data.list.length > 0) {
      const weatherData = data.list[0];
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;

      weatherInfo.innerHTML = `
        <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${description}</p>
      `;
    } else {
      weatherInfo.innerHTML = `<p>No weather data available.</p>`;
    }
  })
  .catch(error => {
    weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    console.error(error);
  });
}