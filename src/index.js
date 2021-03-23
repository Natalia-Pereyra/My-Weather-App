function formatDate(timestamp) {
let date = new Date(timestamp);
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
}

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
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = `${day},  ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "&appid=396c00224132d4189b94cab19ab901e7";
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "&units=metric";
  let apiUrl = `${api}${city}${apiKey}${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description-weather");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-date")
  let iconElement = document.querySelector("#icon");

  
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLo);
}

function currentLo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "396c00224132d4189b94cab19ab901e7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
 let city = "Paris";
  axios.get(url).then(showTemperature);
}
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", showLocation);
