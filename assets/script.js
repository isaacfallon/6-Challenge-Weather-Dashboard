const cityFormEl = document.querySelector('#city-form');
const cityInputEl = document.querySelector('#cityInput');

// Text elements for the city's current weather information
const cityNameEl = document.querySelector('#cityName');
const cityTempEl = document.querySelector('#cityTemp');
const cityWindEl = document.querySelector('#cityWind');
const cityHumidityEl = document.querySelector('#cityHumidity');

const pastCitiesEl = document.querySelector('#pastCities');

// Open Weather API key
const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

const citySubmitHandler = function(event) {
    event.preventDefault();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&units=metric&appid=${apiKey}`;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);

            cityNameEl.textContent = data.name;
            cityTempEl.textContent = `Temperature: ${data.main.temp} C`;
            cityWindEl.textContent = `Wind: ${data.wind.speed} m/s`;
            cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;

            let cityButton = document.createElement('button');
            let cityName = document.createElement('h4');
            cityName.textContent = data.name;

            cityButton.appendChild(cityName);
            pastCitiesEl.appendChild(cityButton);
          });
        }
    });

    
}

cityFormEl.addEventListener('submit', citySubmitHandler);