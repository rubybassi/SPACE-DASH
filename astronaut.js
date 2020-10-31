const showDataDiv = $('#showData');
const userBtn = $('#userBtn');

function getData() {
    const queryUrl = `http://api.open-notify.org/astros.json`;
    $.ajax({
        url: queryUrl,
    });
}
  

$(userBtn).on('click', (event) => {
    event.preventDefault();
    getData();
  });