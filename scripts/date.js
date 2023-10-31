//date from google date
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
let month = monthes[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
 minutes = `0${minutes}`;
}

function formatDate(){
let now =`${day}, the ${date}<sup>st</sup> of ${month} ${hours}:${minutes}`;
  return now;
}
console.log(formatDate(now));
document.getElementById("demo").innerHTML = formatDate();

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}
function newMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
 let monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  return monthes[month];
}
function newDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let newdate = date.getDate();
  return newdate;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let newforecast = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) { 
    if (index > 0 && index <6) {
      forecastHTML = forecastHTML + `
  <div class="col">
    <h2 class="day-of-week">${formatDay(forecastDay.dt)}</h2>
    <p>The ${newDay(forecastDay.dt)}<sup>st</sup> of ${newMonth(forecastDay.dt)}</p>
    <p>
      <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}</span>°C /
      <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}</span>°C
    </p>
    <img
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt="Weather icon"
      width="90"
    />
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  newforecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
 let apiKey = "017d56650cd168d68067850318775d43";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//temperature
function showTemperature(response) {
  console.log(response.data);

  let newsky = document.querySelector("#sky");
  newsky.innerHTML = response.data.weather[0].description;
  
  celsiusTemperature = response.data.main.temp;
  let newtemperature = document.querySelector("#temperature-value");
  newtemperature.innerHTML = Math.round(celsiusTemperature);
  
  let newhumidity = document.querySelector("#humidity");
  newhumidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let newcountry = document.querySelector("#current-country");
  newcountry.innerHTML = response.data.sys.country;
  
  let newcity = document.querySelector("#current-city");
  newcity.innerHTML = response.data.name;

  let newdate = document.querySelector("#demo");
  newdate.innerHTML = formatDate(response.data.dt * 1000);

  let newicon = document.querySelector("#main-icon");
  newicon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  newicon.setAttribute("alt", response.data.weather[0].description);

   getForecast(response.data.coord);
}

//city
function search(city) {
  let apiKey = "3e895220a2e7601fff911f043d66afb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name-input");
  let cityCurrent = document.querySelector("#current-city");
  if (city.value) {
    cityCurrent.innerHTML = city.value;
  } else {
    city.value = null;
    alert("Please, type a city");
  }
  search(city.value);
}
let searchC = document.querySelector("#search-form");
searchC.addEventListener("submit", searchCity); 

//geolocation
function showPosition(position) {
  let apiKey = "3e895220a2e7601fff911f043d66afb7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geobutton = document.querySelector("#button-current-input");
geobutton.addEventListener("click", getCurrentPosition);

//F/C
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let newtemperature = document.querySelector("#temperature-value");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  newtemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let newtemperature = document.querySelector("#temperature-value");
  newtemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTemperature);

search("Kharkiv");