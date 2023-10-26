//date from google date
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
let month = monthes[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

function formatDate(){
let now =`${day}, ${date} of ${month} ${hours}:${minutes}`;
  return now;
}
console.log(formatDate(now));
document.getElementById("demo").innerHTML = formatDate();

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

//temperature
function showTemperature(response) {
  console.log(response.data);

  let newsky = document.querySelector("#sky");
  newsky.innerHTML = response.data.weather[0].description;
  
  let newtemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = newtemperature;
  
  let newhumidity = document.querySelector("#humidity");
  newhumidity.innerHTML = response.data.main.humidity;

  let newwind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = newwind;

  let newcountry = document.querySelector("#current-country");
  newcountry.innerHTML = response.data.sys.country;
  
  let newcity = document.querySelector("#current-city");
  newcity.innerHTML = response.data.name;
}

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
// let fahrenheit = document.querySelector("#fahrenheit-link");
//  let celsius = document.querySelector("#celsius-link");
//let temperatureValue = document.querySelector("#temperature-value");
  
//function changeUnitsF(event) {
  //event.preventDefault();
   // temperatureValue.innerHTML = "66";
  //}
//fahrenheit.addEventListener("click", changeUnitsF);

//function changeUnitsC(event) {
 // event.preventDefault();
 //   temperatureValue.innerHTML = "18";
 // }
 // celsius.addEventListener("click", changeUnitsC);