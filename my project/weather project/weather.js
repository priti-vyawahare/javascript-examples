window.addEventListener("load", () => { // as soon as page load this event occure
let long;
let lat;
let temperatureDescription = document.querySelector(".temprature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection =  document.querySelector(".temperature");
let temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation) {// predefine statement for getting geolocation
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;// after console.log(position) we get value longitude and latitude
            lat = position.coords.latitude;

            
            const api = `http://api.weatherapi.com/v1/current.json?key=2014695616174bf6a19113223210607&q=amsterdam&aqi=no`;
            // got this free weather company that provides an API https://www.weatherapi.com/my/ 

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data); //when we run console then in console we can see all info in current
                    const { temp_f, icon} = data.current;
                    const text = data.current.condition.text;
                    const name = data.location.name;
            // const icon = data.current.condition.icon;
                    
        //const text = data.condition;

        //set DOM Elements from the API
             temperatureDegree.textContent = temp_f;
             temperatureDescription.textContent = text;
              locationTimezone.textContent = name;
        // formula for celcious
        let celcious = (temp_f - 32)* (5/9);
                    
         // set icon
         
        setIcon(icon, document.querySelector(".icon"));

         // temprature farenheit to celcious and vice varsa
            temperatureSection.addEventListener("click",() => {
            if(temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celcious);
            } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = temp_f;
            }
            })

                });
        });
    }
    function setIcon(icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/ /g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
    });