const cityFormEl = document.querySelector('#city-form');
const cityInputEl = document.querySelector('#cityInput');

// Text elements for the city's current weather information
const cityNameEl = document.querySelector('#cityName');
const cityTempEl = document.querySelector('#cityTemp');
const cityWindEl = document.querySelector('#cityWind');
const cityHumidityEl = document.querySelector('#cityHumidity');

const pastCitiesEl = document.querySelector('#pastCities');

document.getElementById(`right-content`).style.visibility = `hidden`;

// OpenWeather API key
const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

// Time & date set up
const now = dayjs();
let tomorrow = now.add(1, 'day').format('DD/MM/YYYY');

const citySubmitHandler = function(event) {
    event.preventDefault();

    document.getElementById(`right-content`).style.visibility = `visible`;

    let dataValue = cityInputEl.value;

    showCurrentWeather(dataValue);

    // const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&units=metric&appid=${apiKey}`;

    // fetch(apiUrlToday).then(function (response) {
    //     if (response.ok) {
    //       response.json().then(function (data) {
    //         console.log(data);

    //         cityNameEl.textContent = `${data.name} ${now.format('DD/MM/YYYY')}`;

    //         var iconcodeToday = data.weather[0].icon;
    //         var iconurlToday = "http://openweathermap.org/img/w/" + iconcodeToday + ".png";
    //         $('#wiconToday').attr('src', iconurlToday);

    //         cityTempEl.textContent = `Temperature: ${data.main.temp} °C`;
    //         cityWindEl.textContent = `Wind: ${data.wind.speed} m/s`;
    //         cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;

    //         let cityButton = document.createElement('button');
    //         cityButton.setAttribute('data-value', data.name);
    //         let cityName = document.createElement('h4');
    //         cityName.textContent = data.name;

    //         cityButton.appendChild(cityName);
    //         pastCitiesEl.appendChild(cityButton);
    //       });
    //     }
    // });

    showFiveDayForecast(dataValue);

    // const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputEl.value}&units=metric&appid=${apiKey}`;

    // fetch(apiUrlFiveDays).then(function (response) {
    //   if (response.ok) {
    //     response.json().then(function (data) {
    //       console.log(data);

    //       //Weather data for tomorrow
    //       console.log(data.list[7].dt_txt + ` ` + data.list[7].main.temp);
    //       document.getElementById(`day1Date`).textContent = now.add(1, 'day').format('DD/MM/YYYY');

    //       var iconcode1 = data.list[7].weather[0].icon;
    //       var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
    //       $('#wicon1').attr('src', iconurl1);

    //       document.getElementById(`day1Weather`).textContent = `Temp: ` + data.list[7].main.temp + ` °C`;
    //       document.getElementById(`day1Wind`).textContent = `Wind: ` + data.list[7].wind.speed + ` m/s`;
    //       document.getElementById(`day1Humidity`).textContent = `Humidity: ` + data.list[7].main.humidity + `%`;

    //       //Weather data for day after tomorrow
    //       console.log(data.list[15].dt_txt + ` ` + data.list[15].main.temp);
    //       document.getElementById(`day2Date`).textContent = now.add(2, 'day').format('DD/MM/YYYY');

    //       var iconcode2 = data.list[15].weather[0].icon;
    //       var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
    //       $('#wicon2').attr('src', iconurl2);
 
    //       document.getElementById(`day2Weather`).textContent = `Temp: ` + data.list[15].main.temp + ` °C`;
    //       document.getElementById(`day2Wind`).textContent = `Wind: ` + data.list[15].wind.speed + ` m/s`;
    //       document.getElementById(`day2Humidity`).textContent = `Humidity: ` + data.list[15].main.humidity + `%`;

    //       //Weather data for in 3 day's time
    //       console.log(data.list[23].dt_txt + ` ` + data.list[23].main.temp);
    //       document.getElementById(`day3Date`).textContent = now.add(3, 'day').format('DD/MM/YYYY');

    //       var iconcode3 = data.list[23].weather[0].icon;
    //       var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
    //       $('#wicon3').attr('src', iconurl3);

    //       document.getElementById(`day3Weather`).textContent = `Temp: ` + data.list[23].main.temp + ` °C`;
    //       document.getElementById(`day3Wind`).textContent = `Wind: ` + data.list[23].wind.speed + ` m/s`;
    //       document.getElementById(`day3Humidity`).textContent = `Humidity: ` + data.list[23].main.humidity + `%`;

    //       //Weather data for in 4 day's time
    //       console.log(data.list[31].dt_txt + ` ` + data.list[31].main.temp);
    //       document.getElementById(`day4Date`).textContent = now.add(4, 'day').format('DD/MM/YYYY');

    //       var iconcode4 = data.list[31].weather[0].icon;
    //       var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
    //       $('#wicon4').attr('src', iconurl4);

    //       document.getElementById(`day4Weather`).textContent = `Temp: ` + data.list[31].main.temp + ` °C`;
    //       document.getElementById(`day4Wind`).textContent = `Wind: ` + data.list[31].wind.speed + ` m/s`;
    //       document.getElementById(`day4Humidity`).textContent = `Humidity: ` + data.list[31].main.humidity + `%`;

    //       //Weather data for in 5 day's time
    //       console.log(data.list[39].dt_txt + ` ` + data.list[39].main.temp);
    //       document.getElementById(`day5Date`).textContent = now.add(5, 'day').format('DD/MM/YYYY');

    //       var iconcode5 = data.list[39].weather[0].icon;
    //       var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
    //       $('#wicon5').attr('src', iconurl5);

    //       document.getElementById(`day5Weather`).textContent = `Temp: ` + data.list[39].main.temp + ` °C`;
    //       document.getElementById(`day5Wind`).textContent = `Wind: ` + data.list[39].wind.speed + ` m/s`;
    //       document.getElementById(`day5Humidity`).textContent = `Humidity: ` + data.list[39].main.humidity + `%`;

    //     });
    //   }
    //   });
    
}

pastCitiesEl.addEventListener('click', function(event) {
  const element = event.target;
  if (element.matches('button') === true) {

    let dataValue = element.getAttribute('data-value');
    showCurrentWeather(dataValue);
    showFiveDayForecast(dataValue);
    // alert(dataValue);

   }

})

function showCurrentWeather(dataValue) {
  const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=${dataValue}&units=metric&appid=${apiKey}`;

  fetch(apiUrlToday).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          cityNameEl.textContent = `${data.name} ${now.format('DD/MM/YYYY')}`;

          var iconcodeToday = data.weather[0].icon;
          var iconurlToday = "http://openweathermap.org/img/w/" + iconcodeToday + ".png";
          $('#wiconToday').attr('src', iconurlToday);

          cityTempEl.textContent = `Temperature: ${data.main.temp} °C`;
          cityWindEl.textContent = `Wind: ${data.wind.speed} m/s`;
          cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;

          let cityButton = document.createElement('button');
          cityButton.setAttribute('data-value', data.name);
          let cityName = document.createElement('h4');
          cityName.textContent = data.name;

          cityButton.appendChild(cityName);
          pastCitiesEl.appendChild(cityButton);

        })
      }

      
    }
    )
}

function showFiveDayForecast(dataValue) {
  const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${dataValue}&units=metric&appid=${apiKey}`;

    fetch(apiUrlFiveDays).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          //Weather data for tomorrow
          console.log(data.list[7].dt_txt + ` ` + data.list[7].main.temp);
          document.getElementById(`day1Date`).textContent = now.add(1, 'day').format('DD/MM/YYYY');

          var iconcode1 = data.list[7].weather[0].icon;
          var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
          $('#wicon1').attr('src', iconurl1);

          document.getElementById(`day1Weather`).textContent = `Temp: ` + data.list[7].main.temp + ` °C`;
          document.getElementById(`day1Wind`).textContent = `Wind: ` + data.list[7].wind.speed + ` m/s`;
          document.getElementById(`day1Humidity`).textContent = `Humidity: ` + data.list[7].main.humidity + `%`;

          //Weather data for day after tomorrow
          console.log(data.list[15].dt_txt + ` ` + data.list[15].main.temp);
          document.getElementById(`day2Date`).textContent = now.add(2, 'day').format('DD/MM/YYYY');

          var iconcode2 = data.list[15].weather[0].icon;
          var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
          $('#wicon2').attr('src', iconurl2);
 
          document.getElementById(`day2Weather`).textContent = `Temp: ` + data.list[15].main.temp + ` °C`;
          document.getElementById(`day2Wind`).textContent = `Wind: ` + data.list[15].wind.speed + ` m/s`;
          document.getElementById(`day2Humidity`).textContent = `Humidity: ` + data.list[15].main.humidity + `%`;

          //Weather data for in 3 day's time
          console.log(data.list[23].dt_txt + ` ` + data.list[23].main.temp);
          document.getElementById(`day3Date`).textContent = now.add(3, 'day').format('DD/MM/YYYY');

          var iconcode3 = data.list[23].weather[0].icon;
          var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
          $('#wicon3').attr('src', iconurl3);

          document.getElementById(`day3Weather`).textContent = `Temp: ` + data.list[23].main.temp + ` °C`;
          document.getElementById(`day3Wind`).textContent = `Wind: ` + data.list[23].wind.speed + ` m/s`;
          document.getElementById(`day3Humidity`).textContent = `Humidity: ` + data.list[23].main.humidity + `%`;

          //Weather data for in 4 day's time
          console.log(data.list[31].dt_txt + ` ` + data.list[31].main.temp);
          document.getElementById(`day4Date`).textContent = now.add(4, 'day').format('DD/MM/YYYY');

          var iconcode4 = data.list[31].weather[0].icon;
          var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
          $('#wicon4').attr('src', iconurl4);

          document.getElementById(`day4Weather`).textContent = `Temp: ` + data.list[31].main.temp + ` °C`;
          document.getElementById(`day4Wind`).textContent = `Wind: ` + data.list[31].wind.speed + ` m/s`;
          document.getElementById(`day4Humidity`).textContent = `Humidity: ` + data.list[31].main.humidity + `%`;

          //Weather data for in 5 day's time
          console.log(data.list[39].dt_txt + ` ` + data.list[39].main.temp);
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


cityFormEl.addEventListener('submit', citySubmitHandler);