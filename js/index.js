async function show() {
  let city = document.getElementById("tempInput").value;
  if (city.length == 0) {
    city = "Delhi";
  }
  let ApiKey = "73cb994951be9a92baa0b53fc0da77c2";
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
  document.getElementById("tempInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter key pressed");
      show();
    }
  });
  await fetch(API)
    .then((e) => e.json())
    .then((data) => {
      console.log(data);
      var temp = data.main.temp - 273.15;
      var temp_max = data.main.temp_max - 273.15;
      var temp_min = data.main.temp_min - 273.15;
      var temp = temp.toFixed(1);
      var temp_max = temp_max.toFixed(1);
      var temp_min = temp_min.toFixed(1);

      document.getElementById("temp").innerHTML = temp + " C";
      document.getElementById("temp_max").innerHTML = temp_max + " C";
      document.getElementById("temp_min").innerHTML = temp_min + " C";
      document.getElementById("city").innerHTML = data.name;
      document.getElementById("humidity").innerHTML = data.main.humidity + "%";
      document.getElementById("cont").innerHTML = data.sys.country;
      document.getElementById("sunrise").innerHTML = new Date(
        data.sys.sunrise * 1000
      ).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
      document.getElementById("sunset").innerHTML = new Date(
        data.sys.sunset * 1000
      ).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    });
}
show();
