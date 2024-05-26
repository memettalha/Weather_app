const info  = document.querySelector(".info");
const search  = document.querySelector("#search");
const send  = document.querySelector(".send");

const apiKey = "48f22c92ea1c2dcefd98b15b054b247f";
//Keyup ile Çalıştırma

function gettingCity(){
  search.addEventListener("input",(event) =>{
    const city = event.target.value;
    console.log(city)
      const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('city');
    Weather(city)
  })  
}  
//Buton click ile çalıştırma
send.addEventListener("click",()=>{
  Weather(search.value);
})
//Enter basarak çalıştırma
search.addEventListener("keypress",(event) =>{
  if(event.key === "Enter"){
    event.preventDefault();
    Weather(search.value)
  }

})
async function Weather(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json()
    console.log( data)
    info.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-body">
    <img src="sunny.png" alt="" id="weatherImage" name="weatherImage">
      <h5 class="card-title d-flex justify-content-center">${data.name}/ ${data.sys.country}</h5>
      <p class="derece d-flex justify-content-center">${(data.main.temp - 273.15).toFixed(1)}°C</p>
      <p class=" nem d-flex justify-content-center"><i class="bi bi-droplet-fill"></i>%${data.main.humidity} Nem</p>
      <p id="humidity" class="d-flex justify-content-center">${ data.weather[0].main}</p>
      <p id="wind" class="d-flex justify-content-center"><i class="fa-solid fa-wind"></i>${data.wind.speed} km/h</p>
    </div>
  </div>`
  const weatherImage =  document.querySelector("#weatherImage");
  const humidity =  document.querySelector("#humidity");
  const weatherDescription = data.weather[0].main;
  if (weatherDescription=== "Clear"){
    weatherImage.src = "images//clear.png"
    humidity.textContent = "Açık";
  } else if (weatherDescription=== "Clouds"){
    weatherImage.src = "images//cloud.png"
    humidity.textContent = "Parçalı Bulutlu";
  } else if (weatherDescription=== "Rain"){
    weatherImage.src = "images//rain.png"
    humidity.textContent = "Yağmurlu";
  }  else if (weatherDescription=== "Snow"){
    weatherImage.src = "images//snow.png";
    humidity.textContent = "Karlı";

  }
}
gettingCity()