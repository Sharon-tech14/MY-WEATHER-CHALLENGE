console.log("Script.js loaded!");

// Global API key
const apiKey = "0b0730393co7c0e96d521df6373adt84";

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function refreshWeather(response) {
  let data = response.data;

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current
  );
  document.querySelector("#description").innerHTML = data.condition.description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${data.temperature.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    data.wind.speed
  )} km/h`;
  document.querySelector("#time").innerHTML = formatDate(data.time);

  // Set icon src and alt
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", data.condition.icon_url);
  iconElement.setAttribute("alt", data.condition.description);

  // Load forecast
  getForecast(data.city);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img 
            src="${day.condition.icon_url}" 
            class="weather-forecast-icon" 
            alt="${day.condition.description}"
          />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">
              ${Math.round(day.temperature.minimum)}°
            </div>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log("Forecast API:", apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");
  searchCity(input.value.trim());
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

// Load default city on page load
searchCity("Paris");
