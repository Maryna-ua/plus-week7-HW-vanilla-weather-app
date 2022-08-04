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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// forecast
function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
              <div class="card">
                <div class="temp-day">${Math.round(
                  forecastDay.temp.max
                )}°C</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=" "
                  id="icon"
                />
                <span class="temp-night">/${Math.round(
                  forecastDay.temp.min
                )}°C</span>
                </br>
                <span class="weekday">${formatDay(forecastDay.dt)}</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastDay.temp.min);
}

function getForecast(coord) {
  let apiKey = "1c6f613839ce6b71f2df6e20804a91d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

//search engine
function showWeather(response) {
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1c6f613839ce6b71f2df6e20804a91d8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
  let newSearch = document.querySelector("#choice-city");
  newSearch.addEventListener("submit", convertToC);
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
locationButton.addEventListener("click", convertToC);

search("kyiv");
