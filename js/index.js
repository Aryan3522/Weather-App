async function show(){
    let city = document.getElementById("tempInput").value;
    let ApiKey = "73cb994951be9a92baa0b53fc0da77c2"
    let chatbot = "96cd055b9c21402d839b3e1e15b452fe"
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}` 
    fetch(API).then(e => e.json()).then((data)=>{
        console.log(data)
        var temp = data.main.temp - 273.15;
        var temp_max = data.main.temp_max-273.15;
        var temp_min = data.main.temp_min-273.15;
        var temp =  temp.toFixed(1);
        var temp_max = temp_max.toFixed(1)
        var temp_min = temp_min.toFixed(1)

        // time
        var completedate = new Date(data.sys.sunrise *1000);
        document.getElementById("temp").innerHTML =temp+ " C";
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("temp_max").innerHTML =temp_max + " C";
        document.getElementById("temp_min").innerHTML =temp_min + " C";
        document.getElementById("cont").innerHTML = data.sys.country;
        document.getElementById("sunrise").innerHTML =completedate.getHours() + ":" + completedate.getMinutes() + ":" + completedate.getSeconds();
        document.getElementById("sunset").innerHTML = new Date(data.sys.sunset *1000) ;
    })
  }