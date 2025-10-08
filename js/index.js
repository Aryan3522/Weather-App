const tempInput = document.getElementById("tempInput");
const ApiKey = "73cb994951be9a92baa0b53fc0da77c2";
const weatherIcon = document.getElementById("weather_icon");
const bgContainer = document.getElementById("bg");


async function show() {
  const city = tempInput.value;
  if (!city) return; 
  tempInput.value = "";
  
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
  
  try {
    const response = await fetch(API);
    const data = await response.json();
    let videoSrc = "";
    let icon = "";

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }
    
    const temp = (data.main.temp - 273.15).toFixed(1);
    const feels_like = (data.main.feels_like - 273.15).toFixed(1);
    const weather = data.weather[0].description.toLowerCase();

    document.getElementById("city").textContent = data.name;
    document.getElementById("country").textContent = data.sys.country;
    document.getElementById("temp").innerHTML = `${temp} &deg;C`;
    document.getElementById("feels-like").innerHTML = `Feels Like ${feels_like} &deg;C`;
    document.getElementById("description").innerHTML = weather.toUpperCase();
    document.getElementById("datetime").innerHTML = new Date()
      .toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
      .replace(",", " |");
    document.getElementById("sunrise").textContent = new Date(data.sys.sunrise * 1000)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("sunset").textContent = new Date(data.sys.sunset * 1000)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;


    if (weather.includes("cloud")) {
      icon = "☁️";
      videoSrc = "./bg/cloudy.mp4";
    } else if (weather.includes("rain")) {
      icon = "🌧️";
      videoSrc = "./bg/rain.mp4";
    } else if (weather.includes("sun") || weather.includes("clear")) {
      icon = "🌤️";
      videoSrc = "./bg/clear.mp4";
    } else if (weather.includes("thunder")) {
      icon = "⛈️";
      videoSrc = "./bg/rain.mp4";
    } else if (weather.includes("snow")) {
      icon = "❄️";
      videoSrc = "./bg/snow.mp4";
    } else if (weather.includes("mist") || weather.includes("fog")) {
      icon = "🌫️";
      videoSrc = "./bg/snow.mp4";
    } else {
      icon = "🌍";
      videoSrc = "./bg/weather_background.mp4";
    }

    weatherIcon.textContent = icon;

    const oldVideo = document.getElementById("background");
    if (oldVideo) oldVideo.remove();

    const video = document.createElement("video");
    video.id = "background";
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.zIndex = "-1";
    video.style.filter = "opacity(0.9)";

    bgContainer.appendChild(video);

  } catch (err) {
    console.error("Error fetching weather data:", err);
    alert("Failed to fetch weather data. Check your internet connection.");
  }
}

// --------------------------------------------
// EVENT LISTENERS
// --------------------------------------------
let isFetching = false;

tempInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !isFetching) {
    isFetching = true;
    show().finally(() => { isFetching = false; });
  }
});
