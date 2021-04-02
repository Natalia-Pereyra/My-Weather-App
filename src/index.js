function formatDate(timestamp) {
let date = new Date(timestamp);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[date.getDay()];

return `Local time: ${day} ${formatHours(timestamp)}`;
}

let now = new Date();
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(now);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
 }
return `${hour}:${minutes}`; 
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description-weather");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-date")
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

function displayForecast(response) {
  let forecastElement = document.querySelector("#all-forecast");
  let forecast = response.data.list[0];

  forecastElement.innerHTML = `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
                 class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
             `;
                
   forecast = response.data.list[1];
   forecastElement.innerHTML += `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
                  class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
            `;
              
       forecast = response.data.list[2];      
       forecastElement.innerHTML += `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
               class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
            `;  
              
      forecast = response.data.list[3];
      forecastElement.innerHTML += `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
                class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
            `;  
            
      forecast = response.data.list[4];
      forecastElement.innerHTML += `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
                class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
            `;  
            
       forecast = response.data.list[5];
      forecastElement.innerHTML += `
      <div class="col-2 text-center">
                <h6>${formatHours(forecast.dt * 1000)}</h6>
                <img 
                class="w-100"
                 src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
                <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}°C </strong>${Math.round(forecast.main.temp_min)}°C
            </div>
            </div>
            `;         
              
                
                
      
}

function search(city) {
  let apiKey = "&appid=396c00224132d4189b94cab19ab901e7";
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "&units=metric";
  let apiUrl = `${api}${city}${apiKey}${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}${apiKey}${units}`;
  axios.get(apiUrl).then(displayForecast);

}


function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

function showPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = getCurrentPosition.value;
}

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition)
