let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let h3 = document.querySelector("h3");
h3.innerHTML = `${day},  ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
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
  let currentTemperature = document.querySelector("#number");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
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

  axios.get(url).then(showTemperature);
}
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", showLocation);
