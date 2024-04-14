// Form and input fields for the city name entered by the user.
const cityFormEl = document.querySelector('#city-form');
const cityInputEl = document.querySelector('#cityInput');

// Text elements for the city's current weather information
const cityNameEl = document.querySelector('#cityName');
const cityTempEl = document.querySelector('#cityTemp');
const cityWindEl = document.querySelector('#cityWind');
const cityHumidityEl = document.querySelector('#cityHumidity');

// The div container element for past cities which we will add to based on what the user enters.
const pastCitiesEl = document.querySelector('#pastCities');

// We set all the content on the right as 'hidden' so we can display the weather data only when the user enters a city.
document.getElementById(`right-content`).style.visibility = `hidden`;

// OpenWeather API key
const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

// Time & date set up
const now = dayjs();
let tomorrow = now.add(1, 'day').format('DD/MM/YYYY');

// Function to read input cities from storage. If there aren't any in storage, return an empty array. 
// Otherwise, parse the cities array and return. 
function readCitiesFromStorage() {
  let cities = localStorage.getItem("cities");
  if (!cities) {
    return [];
  }
  let citiesParsed = JSON.parse(cities);
  return citiesParsed;
}

// On page load, get the existing cities in local storage (if any) then loop through them 
// and create the previous city buttons. 
$(document).ready(function () {
  let cities = localStorage.getItem("cities");

  if (!cities) {
    return [];
  }
  
  let citiesParsed = JSON.parse(cities);
  for (let i = 0; i < citiesParsed.length; i++) {
    console.log(citiesParsed[i])

    let cityButton = document.createElement('button');
    cityButton.setAttribute('data-value', citiesParsed[i]);
    cityButton.classList.add('btn');
    cityButton.classList.add('btn-secondary');
    let cityName = document.createElement('h4');
    cityName.textContent = citiesParsed[i];

    cityButton.appendChild(cityName);
    pastCitiesEl.appendChild(cityButton);
  }

  return citiesParsed;
})

// A function to save tasks to local storage is set. We can call this when needed throughout the file. 
function saveCitiesToStorage(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Function to handle the city submission when the user enters a city name and hits submit. 
const citySubmitHandler = function(event) {
    event.preventDefault();

    // User input is checked to see if something is entered. 
    if (!cityInputEl.value) {
      alert('Entry cannot be blank. Please enter a valid city name.');
    } else {
      
      // If the city entered is a proper city name, set the right content to visible.
    document.getElementById(`right-content`).style.visibility = `visible`;

    // Capture the user city input and pass it to the functions which display the weather data below.
    let dataValue = cityInputEl.value;

    // We read get any existing cities from storage and then push the new city to the array of existing cities. 
    const cities = readCitiesFromStorage();
    cities.push(cityInputEl.value);

    // We then save all tasks to local storage and render all tasks to their lanes 
    // by calling the respective functions. 
    saveCitiesToStorage(cities);

    showCurrentWeather(dataValue);
    showFiveDayForecast(dataValue);

          // Then we create a button and text for the city just entered to then be added to the past cities div
          // underneath the city input field.
          let cityButton = document.createElement('button');
          cityButton.setAttribute('data-value', dataValue);
          cityButton.classList.add('btn');
          cityButton.classList.add('btn-secondary');
          let cityName = document.createElement('h4');
          cityName.textContent = dataValue;

          cityButton.appendChild(cityName);
          pastCitiesEl.appendChild(cityButton);

          cityInputEl.value = '';
    }
}

// Function to display the current weather for the city input. 
function showCurrentWeather(dataValue) {
  // API for the current weather is called based on the city input and API key provided.
  const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=${dataValue}&units=metric&appid=${apiKey}`;

  // We then fetch the data within the current weather object called.
  fetch(apiUrlToday).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          // Set the text content for the city name and date using DayJS.
          cityNameEl.textContent = `${data.name} ${now.format('DD/MM/YYYY')}`;

          // We pull out all the necessary data points from within the current weather API fetch. 
          // The icon is created by pulling out the icon code and concatenating it to the 
          // img's source URL to grab the exact one we need. 
          var iconcodeToday = data.weather[0].icon;
          var iconurlToday = "http://openweathermap.org/img/w/" + iconcodeToday + ".png";
          $('#wiconToday').attr('src', iconurlToday);

          // Temp, wind and humidity data points pulled out and set as text content. 
          cityTempEl.textContent = `Temperature: ${data.main.temp} °C`;
          cityWindEl.textContent = `Wind: ${data.wind.speed} m/s`;
          cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;
        })
      }
    })
}

// Function to show the future weather forecast for the city input. 
function showFiveDayForecast(dataValue) {
    // API for the five-day weather forecast is called based on the city input and API key provided.
  const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${dataValue}&units=metric&appid=${apiKey}`;

   // We then fetch the data within the forecast weather object called.
    fetch(apiUrlFiveDays).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          // We pull out all the necessary data points from within the forecast weather API fetch for each day's data.

          // Weather data for tomorrow
          // First we set the date by setting the text content of the date field to be 'now' in DayJS plus one day.
          document.getElementById(`day1Date`).textContent = now.add(1, 'day').format('DD/MM/YYYY');

          // Then we assign the icon depending on the weather by pulling the icon code from the API call 
          // and concatenate it to the img's source URL to grab the exact one we need. 
          var iconcode1 = data.list[7].weather[0].icon;
          var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
          $('#wicon1').attr('src', iconurl1);

          // Then we pull out the temp, wind and humidity data from within the API call and set the text content
          // throughout using string concatenation with the appropriate data symbols. 
          document.getElementById(`day1Weather`).textContent = `Temp: ` + data.list[7].main.temp + ` °C`;
          document.getElementById(`day1Wind`).textContent = `Wind: ` + data.list[7].wind.speed + ` m/s`;
          document.getElementById(`day1Humidity`).textContent = `Humidity: ` + data.list[7].main.humidity + `%`;

          // THEN WE DO THE SAME FOR THE REST OF THE FORECAST DAYS BELOW

          // Weather data for day after tomorrow
          document.getElementById(`day2Date`).textContent = now.add(2, 'day').format('DD/MM/YYYY');

          var iconcode2 = data.list[15].weather[0].icon;
          var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
          $('#wicon2').attr('src', iconurl2);
 
          document.getElementById(`day2Weather`).textContent = `Temp: ` + data.list[15].main.temp + ` °C`;
          document.getElementById(`day2Wind`).textContent = `Wind: ` + data.list[15].wind.speed + ` m/s`;
          document.getElementById(`day2Humidity`).textContent = `Humidity: ` + data.list[15].main.humidity + `%`;

          // Weather data for in 3 day's time
          document.getElementById(`day3Date`).textContent = now.add(3, 'day').format('DD/MM/YYYY');

          var iconcode3 = data.list[23].weather[0].icon;
          var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
          $('#wicon3').attr('src', iconurl3);

          document.getElementById(`day3Weather`).textContent = `Temp: ` + data.list[23].main.temp + ` °C`;
          document.getElementById(`day3Wind`).textContent = `Wind: ` + data.list[23].wind.speed + ` m/s`;
          document.getElementById(`day3Humidity`).textContent = `Humidity: ` + data.list[23].main.humidity + `%`;

          // Weather data for in 4 day's time
          document.getElementById(`day4Date`).textContent = now.add(4, 'day').format('DD/MM/YYYY');

          var iconcode4 = data.list[31].weather[0].icon;
          var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
          $('#wicon4').attr('src', iconurl4);

          document.getElementById(`day4Weather`).textContent = `Temp: ` + data.list[31].main.temp + ` °C`;
          document.getElementById(`day4Wind`).textContent = `Wind: ` + data.list[31].wind.speed + ` m/s`;
          document.getElementById(`day4Humidity`).textContent = `Humidity: ` + data.list[31].main.humidity + `%`;

          // Weather data for in 5 day's time
          document.getElementById(`day5Date`).textContent = now.add(5, 'day').format('DD/MM/YYYY');

          var iconcode5 = data.list[39].weather[0].icon;
          var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
          $('#wicon5').attr('src', iconurl5);

          document.getElementById(`day5Weather`).textContent = `Temp: ` + data.list[39].main.temp + ` °C`;
          document.getElementById(`day5Wind`).textContent = `Wind: ` + data.list[39].wind.speed + ` m/s`;
          document.getElementById(`day5Humidity`).textContent = `Humidity: ` + data.list[39].main.humidity + `%`;

        });
      }
      });
}

// Function to run when the 'past city' buttons are clicked.
pastCitiesEl.addEventListener('click', function(event) {

  document.getElementById(`right-content`).style.visibility = `visible`;

  const element = event.target;
  // Checks to see if the button matches the click target.
  if (element.matches('button') === true) {

    // If so, set an attribute of 'data-value' we can then use to set as the 
    // city input when we call the functions to display the current and future weather.
    let dataValue = element.getAttribute('data-value');
    showCurrentWeather(dataValue);
    showFiveDayForecast(dataValue);
   }

})

// Event delegation is used to handle the submission of the city form 
// input which then runs the function 'citySubmitHandler'.
cityFormEl.addEventListener('submit', citySubmitHandler);

// Clears the local storage and refreshes the page when 
// the 'clear previous cities' button is pressed.
document.getElementById('clearStorage').addEventListener('click', function() {
  localStorage.clear();
  location.reload();
})