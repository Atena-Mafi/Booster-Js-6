const apiKey = '2749a022ee617de5d8781656c132948f';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=CityName&units=imperial&appid=${apiKey}`;

/**
   * Create a  forecast weather program to which take a city name an return the weather situation of the city.
   * 1)We have given you an api, you can get the necessary data from it to show them on screen.

   *
   * 2)create a function named fetchWeather to get the data from api.
   * 2-1)you should make and return a promise and fetch the data inside it in this function
   * 2-2)it should be call with a passed parameter as city name (you need to replace passed city name inside the given URL)
   *
   * 3)create a function as setWeatherInfo to display the weather information on screen
   * (hint: you should use the data obtained in the previous function)
   * 3-1)the function should show the temperature, weatherDescription, city name on screen
   *
   * 4)in the browser: you should show the loading... on screen while you starting the page and waiting for data to fetch
   * 4-1)in any reason when the data not fetched you should show the massage (Failed to fetch weather information. Please try again later.) on screen.
   * (hint: use .then().catch() )
   *
   * hint:path of data you need 👇
   * to access to city name =>data.city.name
   * to access to Temperature => data.list[0].main.temp
   * to access to description => data.list[0].weather[0].description

   */

const form=document.querySelector("form");
const inputEl=document.querySelector("input");
const btn =document.querySelector(".btn");
const show =document.querySelector(".show");
const body=document.querySelector("body");

form.addEventListener("submit",(e)=>{
   e.preventDefault();
   show.innerHTML="";
   loading();
   const inputValue=inputEl.value.trim();
if (inputValue!=="") {
   const format=inputValue.split(" ").map(word=>word.slice(0,1).toUpperCase()+word.slice(1))
      .join(" ");
   setWeatherInfo(format);
   console.log(format);
   inputEl.value="";
}else{

alert("Please Enter a city.");
}

})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchWeather(city) {
return new Promise((resolve, reject) => {
 fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)

.then(response=>{

   if (!response.ok) {
    throw new Error("Failed to fetch weather information.") ;
   }
      return response.json();
 
})

.then(data=>resolve(data))
.catch(err=>reject(err))
})
  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function  setWeatherInfo (city) {
   fetchWeather(city)
.then(data=>{
   show.innerHTML = "";
   const articleEl=document.createElement("article");
    articleEl.classList.add("wSituation");
      show.append(articleEl);

   articleEl.innerHTML=`
   <article class="top">
        <span class="name">${data.city.name}</span>
        <img class="pic"   src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="icon">
        <span class="situation">${data.list[0].weather[0].main}</span>
        <span class="temperature">${data.list[0].main.temp}°F</span>
        <span class="description">${data.list[0].weather[0].description}</span>

      </article>
        <article   class= "wind-humidity">
          <article class="wind">
                <img src="./images/wind.svg" alt="wind" />
            <span>Wind Speed :</span>
            <span>${data.list[0].wind.speed} mph</span>
      
           
          </article>
          <article class="humidity">
          <img src="./images/humidity(2).svg" alt="humidity" />
              <span>Humidity :</span>
            <span>${data.list[0].main.humidity}%</span>
            
         
          </article>
        </article>
     

`
if (data.list[0].sys.pod==="d") {
       body.style.backgroundColor="rgba(252, 197, 87, 0.62)";
       body.style.color="rgb(0, 0, 0)";

}else{

   body.style.backgroundColor=" #1d1d43";
   body.style.color="rgb(255, 255, 255)";
}




})
.catch(err=>{
   console.log(err.message);
   const alertEL=document.createElement("div");
   alertEL.classList.add("alert","alert-danger");
   alertEL.setAttribute("role","alert");
   alertEL.textContent="City not found. Please try again.";
   body.insertAdjacentElement("beforebegin",alertEL);
   setTimeout(()=>{
     alertEL.remove();
     },3000) 
     show.innerHTML = "";    
   })
  
}





function loading() {
     const para=document.createElement("p");
     para.textContent= "Loading...";
   show.append(para);
   
}