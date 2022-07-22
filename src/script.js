let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

//let city = prompt("Enter a city");
//city = city.trim();
//city = city.toLowerCase();

//if (weather[city] !== undefined) {
// let temp = Math.round(weather[city].temp);
// let tempFahrenheit = Math.round(weather[city].temp * 1.8 + 32);
// let humidity = weather[city].humidity;

//alert(
// `It is currently ${temp}°C (${tempFahrenheit}°F) in ${city} with a humidity of ${humidity}%`
// );
//} else {
//alert(
// `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//);
//}

//current time
let now = new Date();
let currentDay = document.querySelector("#current-day");
let currentHours = document.querySelector("#current-hours");
let currentMinutes = document.querySelector("#current-minutes");

let today = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayToday = today[now.getDay()];
currentDay.innerHTML = dayToday;

if (now.getHours() < 10) {
  currentHours.innerHTML = `0${now.getHours()}`;
} else {
  currentHours.innerHTML = now.getHours();
}

if (now.getMinutes() < 10) {
  currentMinutes.innerHTML = `:0${now.getMinutes()}`;
} else {
  currentMinutes.innerHTML = `:${now.getMinutes()}`;
}

//search engine
function showWeather(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  celsiusTemp = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "1c6f613839ce6b71f2df6e20804a91d8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function selectCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;

  search(city);
}

let searchCity = document.querySelector("#choice-city");
searchCity.addEventListener("submit", selectCity);

//°C|F

function convertToF(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temp");
  let fahrenheit = Math.round(celsiusTemp * 1.8 + 32);
  degrees.innerHTML = fahrenheit;
  temperatureC.classList.remove("active");
  temperatureF.classList.add("active");
}

let temperatureF = document.querySelector("#fahrenheit-link");
temperatureF.addEventListener("click", convertToF);

function convertToC(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temp");
  degrees.innerHTML = Math.round(celsiusTemp);
  temperatureC.classList.add("active");
  temperatureF.classList.remove("active");
}

let temperatureC = document.querySelector("#celsius-link");
temperatureC.addEventListener("click", convertToC);

function showPosition(position) {
  let apiKey = "1c6f613839ce6b71f2df6e20804a91d8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

search("kyiv");
