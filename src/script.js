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

function displayDailyForecastWeather() {
  let forecastElement = document.querySelector(".weather-forecast");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];
  let forecast = `<div class="row">`;
  days.forEach(day => {
    forecast = forecast + `
          <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img src="img/cloudy.png" alt="" width="36">
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-min">
                  12°
                </span>
                <span class="weather-forecast-temperatures-max">
                  18°
                </span>
              </div>
            </div>`;
    
  });
  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
displayDailyForecastWeather();