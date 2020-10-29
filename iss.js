const showDataDiv = $('#showData');
const userBtn = $('#userBtn');



// API call for ISS lat and long
const getData = () => {
  const queryUrl =
  `http://api.open-notify.org/iss-now.json`;
  $.ajax({
    url: queryUrl,
  })
  .then(handleWeatherData)
  .catch();
};

const handleWeatherData = (data) => {
    const longitude = data.iss_position.longitude;
    const latitude = data.iss_position.latitude;
    $(showDataDiv)
  .append(`<h2>${longitude}</h2>`)
  .append(`<h2>(${latitude})</h2>`);
}


// Button event
$(userBtn).on('click', (event) => {
    event.preventDefault();
    getData();
  });

  