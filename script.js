console.log("Script.js loaded!");
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
  
  function refreshWeather(response) {
    let data = response.data;
  
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#temperature").innerHTML = Math.round(data.temperature.current);
    document.querySelector("#description").innerHTML = data.condition.description;
    document.querySelector("#humidity").innerHTML = `${data.temperature.humidity}%`;
    document.querySelector("#wind-speed").innerHTML = `${Math.round(data.wind.speed)} km/h`;
    document.querySelector("#time").innerHTML = formatDate(data.time);
  
    // Set icon src and alt
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", data.condition.icon_url);
    iconElement.setAttribute("alt", data.condition.description);
  }
  
  function searchCity(city) {
    let apiKey = "0b0730393co7c0e96d521df6373adt84";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let input = document.querySelector("#search-form-input");
    searchCity(input.value.trim());
  }
  
  // Add event listener to the form
  document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);
  
  // Load default city on page load
  searchCity("Paris");
  