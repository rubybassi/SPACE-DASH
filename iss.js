const showDataDiv = $("#showData");
const userBtn = $("#userBtn");
let longitude = "";
let latitude = "";

// API call for ISS lat and long
const getData = () => {
  const queryUrl = `http://api.open-notify.org/iss-now.json`;
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};

const handleWeatherData = (data) => {
  longitude = data.iss_position.longitude;
  latitude = data.iss_position.latitude;
  $(showDataDiv)
    .append(`<h2>Longitude: ${longitude}</h2>`)
    .append(`<h2>Latitude: ${latitude}</h2>`);
};

// Button event
$(userBtn).on("click", (event) => {
  event.preventDefault();
  getData();
});

// Leaflet.js and MapBox for ISS weather map
// const mapDiv =$('#mapBox');
const mapBoxKey =
  "pk.eyJ1Ijoic2FuZHlydWJ5IiwiYSI6ImNrZ3gxdWU4NTAwMnQycm52cHJocDJuMnIifQ.yEcd2QN_oOtUDi7r6u1ZSQ";

// generate map with Leaflet.js library map method setting lat, long and scale
let mymap = L.map("mapid").setView([longitude, latitude], 2);

// generate tiles with mapbox
L.tileLayer(
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
).addTo(mymap);

// add marker
const issMarker = L.icon({
  iconUrl: "Assets/images/misc/satellite.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
});

// add marker to map
L.marker([51.5, -0.09], { icon: issMarker }).addTo(mymap);
