// reference variables
const showDataDiv = $("#showData");
const userBtn = $("#userBtn");
// additonal global variables
let longitude = "";
let latitude = "";
let altitude = " ";
let visibility = "";
let footprint = "";
let timestamp = "";
let daynum = "";
let solar_lat = "";
let solar_lon = "";

// init funtion
$(function () {
  getData();
});

// API call for ISS lat and long
const getData = () => {
  const queryUrl = `https://api.wheretheiss.at/v1/satellites/25544`;
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};

// function to pass and reassign api data to global variables so other leaflet library can access lat and long
const handleWeatherData = (data) => {
  longitude = data.longitude;
  latitude = data.latitude;
  altitude = data.altitude;
  visibility = data.visibility;
  footprint = data.footprint;
  timestamp = data.timestamp;
  daynum = data.daynum;
  solar_lat = data.solar_lat;
  solar_lon = data.solar_lon;
  renderMap(longitude, latitude);
  // console.log('lat is: ', latitude);
  // console.log('footprint is: ', footprint);
};

  // Leaflet.js and MapBox for ISS weather map
  const renderMap = () => {
  const mapBoxKey =
    "pk.eyJ1Ijoic2FuZHlydWJ5IiwiYSI6ImNrZ3gxdWU4NTAwMnQycm52cHJocDJuMnIifQ.yEcd2QN_oOtUDi7r6u1ZSQ";
  // generate map with Leaflet.js library map method setting lat, long and scale
  let issMap = L.map("mapid").setView([longitude, latitude], 2);
  // generate tiles with mapbox
  const getTiles = L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapBoxKey,
    }
  ).addTo(issMap);

  // set custom marker using with Leaflet.js library
  const issMarker = L.icon({
    iconUrl: "Assets/images/misc/satellite.png",
    iconSize: [50, 50],
    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  });

  // add marker to map using with Leaflet.js library
  const addMarker = L.marker([longitude, latitude], { icon: issMarker }).addTo(issMap);
};


// button event listener to render coordinates on page
$(userBtn).on("click", (event) => {
  event.preventDefault();
  // let longDecimal = longitude.toFixed(2);
  // let latDecimal = latitude.toFixed(2);
  // console.log('lat has be reduced to:' , longDecimal)
  $(showDataDiv)
    .append(`<h2>Longitude: ${longitude}</h2>`)
    .append(`<h2>Latitude: ${latitude}</h2>`);
});
