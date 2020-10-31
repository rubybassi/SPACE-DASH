$(document).ready(function () {

    // AJAX call for picture of the day
    const apolloURL = "https://images-api.nasa.gov/search?q=apollo&media_type=image"

    // ajax call for UV
    $.ajax({
        url: apolloURL,
        method: "GET"
    }).then(function (apolloImages) {
        let apolloTitle = apolloImages.collection.items[0].data[0].title
        let apolloImage = apolloImages.collection.items[0].links[0].href
       $("#apolloTitle").text("Title: " + apolloTitle);
       $("#apolloImage").attr("src", apolloImage);;
    });

  

});


