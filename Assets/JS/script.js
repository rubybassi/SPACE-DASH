$(document).ready(function () {

    // AJAX call for picture of the day
    const queryURL = "https://api.nasa.gov/planetary/apod?api_key=TlvltHK45BcgABDzpncHUblvxpst0Cv0BNwk2flA"

    // ajax call for UV
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (pictureOfTheDay) {
        const mainPic = pictureOfTheDay.url
        const mainPicTitle = pictureOfTheDay.title
        $("#picHeader").text(mainPicTitle);
        $('#potdIMG').attr("src", mainPic);

    });

    let dateOfDay = getDateStamp();
    let timeOfDay = getTimeStamp();
    $("#date-header").text(dateOfDay);
    $("#time-header").text(timeOfDay);

});

function getTimeStamp() {
    return moment().format('LTS');
}

function getDateStamp() {
    return moment().format('LL');
}

