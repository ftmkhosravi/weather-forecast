function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}  ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let day = days[date.getDay()];
  return day;
}

function displayDailyForecastWeather(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = `<div class="row">`;
  forecast.forEach((forecastDay , index) => {
    if(index <6){
      forecastHtml =
      forecastHtml +
      `   <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="36">
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-min">
                  ${Math.round(forecastDay.temp.min)}°
                </span>
                <span class="weather-forecast-temperatures-max">
                ${Math.round(forecastDay.temp.max)}°
                </span>
              </div>
            </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = `b35c686ba9565ba0ab254c2230937552`;
  let urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // let keyApi = "be60748992fab0f5da8162563fb21245";
  // let urlApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${keyApi}&units=metric`;

  axios.get(urlApi).then(displayDailyForecastWeather);
}

function displayTemperature(response) {
  let temp = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `response.data.weather[0].description`);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "4aa4f4c485e2f9ad87e3fd6f892979f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  searchCity(cityName.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
