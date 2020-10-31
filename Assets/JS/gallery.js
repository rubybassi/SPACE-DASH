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


    const moonURL = "https://images-api.nasa.gov/search?q=moon&media_type=image"
    // ajax call for UV
    $.ajax({
        url: moonURL,
        method: "GET"
    }).then(function (moonImages) {
        let moonTitle = moonImages.collection.items[0].data[0].title
        let moonImage = moonImages.collection.items[0].links[0].href
       $("#moonTitle").text("Title: " + moonTitle);
       $("#moonImage").attr("src", moonImage);;
    });

    const sunURL = "https://images-api.nasa.gov/search?q=sun&media_type=image"
    // ajax call for UV
    $.ajax({
        url: sunURL,
        method: "GET"
    }).then(function (sunImages) {
        let sunTitle = sunImages.collection.items[0].data[0].title
        let sunImage = sunImages.collection.items[0].links[0].href
       $("#sunTitle").text("Title: " + sunTitle);
       $("#sunImage").attr("src", sunImage);
    });
    
    const galaxiesURL = "https://images-api.nasa.gov/search?q=galaxies&media_type=image"
    // ajax call for UV
    $.ajax({
        url: galaxiesURL,
        method: "GET"
    }).then(function (galaxiesImages) {
        let galaxiesTitle = galaxiesImages.collection.items[0].data[0].title
        let galaxiesImage = galaxiesImages.collection.items[0].links[0].href
       $("#galaxiesTitle").text("Title: " + galaxiesTitle);
       $("#galaxiesImage").attr("src", galaxiesImage);
    });

});


