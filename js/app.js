document.getElementById("userButton").addEventListener('click', function (event) {
    const userInput = document.getElementById("userLocation").value;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=AIzaSyCxf8TVkhDNTlfi7YjStp7etLanI4rVlKY`;
    getLocation(url);
})



const getLocation = (url) => {
    fetch(url)
        .then(function (response) {
            response.json()
        .then(function (data) {
            const coordinates = data.results[0].geometry.location;
            const coordinatesLat = coordinates.lat;
            const coordinatesLng = coordinates.lng;
            const wUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c4d9a81218adf15a76b4861c56b81baf/${coordinatesLat},${coordinatesLng}`;
            getWeather(wUrl);
        })
        })
}

const getWeather = (wUrl) => {
    fetch(wUrl)
        .then(function (response) {
            response.json()
        .then(function (data) {
            const dairyForcast = data.daily.data;
            dairyForcast.forEach(day => {
                console.log(day);
                let template = `
                <div class="card  mb-3 m-3 d-block mx-auto col-6 offset-2">
                <div class="card-body text-center">
                <h3  class="card-title m-1">${unixDateToCurrentDate(day.time)}</h3>
                <p>Temperature-high: ${day.temperatureHigh}</p>
                <p>Temperature-min: ${day.temperatureMin}</p>
                <p>Humidity: ${day.humidity}</p>
                <p>UV index: ${day.uvIndex}</p>
                <p>Wind: ${day.windSpeed}</p>
                <p>Pressure: ${day.pressure}</p>
                </div>
                </div>`;
                let container = document.getElementById('weather-container');
                var newDiv = document.createElement("div");
                newDiv.innerHTML = template;
                container.append(newDiv);
              });

            })
        })
}

const unixDateToCurrentDate = (unixNumber) => new Date(unixNumber * 1000).toLocaleString('en-us', {
    weekday: 'long'
});
