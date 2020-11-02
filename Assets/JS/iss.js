// Reference variables
const showDataDiv = $("#showData");
const userBtn = $("#userBtn");
// Additonal global variables
let longitude = "";
let latitude = "";
let altitude = " ";
let visibility = "";
let footprint = "";
let timestamp = "";
let daynum = "";
let solar_lat = "";
let solar_lon = "";
let velocity = "";

// init funtion
$(function () {
 
// Generate map with Leaflet.js library map method setting default lat, long and scale
let issMap = L.map('mapid').setView([0, 0], 2);


// Generate tiles with mapbox
const getTiles = L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 1.5,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1Ijoic2FuZHlydWJ5IiwiYSI6ImNrZ3gxdWU4NTAwMnQycm52cHJocDJuMnIifQ.yEcd2QN_oOtUDi7r6u1ZSQ",
  }
).addTo(issMap);

// Create custom marker with Leaflet.js library
const issMarker = L.icon({
  iconUrl: "Assets/images/misc/satellite.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
});

// Add marker to map setting deafult values
const addMarker = L.marker([0,0], { icon: issMarker }).addTo(issMap);

// Call API for ISS coordinates
const getData = () => {
  const queryUrl = `https://api.wheretheiss.at/v1/satellites/25544`;
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};
// Function to pass and reassign ISS data to global variables so can reuse for other event handlers
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
  velocity = data.velocity;
  issMap.setView([latitude, longitude]);
  addMarker.setLatLng([latitude, longitude]);
  // add ISS data to dashboard
  $('#longitudeVal').text(longitude.toFixed(5));
  $('#latitudeVal').text(latitude.toFixed(5));
  $('#altitudeVal').text(altitude.toFixed(5));
  $('#visitbiltyVal').text(visibility);
  $('#footprintVal').text(footprint.toFixed(5));
  $('#daynumVal').text(daynum); //
  $('#sollatVal').text(solar_lat.toFixed(5));
  $('#sollongVal').text(solar_lon.toFixed(5));
  $('#velocityVal').text(velocity.toFixed(0));
};

// Call function
getData();

// Set interval to run getData function evey second to make marker move
setInterval(getData, 5000);

});

// button event listener to render coordinates on page
$(userBtn).on("click", (event) => {
  event.preventDefault();
  $(showDataDiv).empty();
  // let longDecimal = longitude.toFixed(2);
  // let latDecimal = latitude.toFixed(2);
  // console.log('lat has be reduced to:' , longDecimal)
  $(showDataDiv)
    .append(`<h2>Velocity: ${velocity} mph</h2>`)
});

