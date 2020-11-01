$(document).ready(function () {

    let apolloImagesArray = [];
    // AJAX call for picture of the day
    const apolloURL = "https://images-api.nasa.gov/search?q=apollo&media_type=image"
    // ajax call for apollo images
    $.ajax({
        url: apolloURL,
        method: "GET"
    }).then(function (apolloImages) {
        for (let i = 0; i < apolloImages.collection.items.length; i++) {
            let imageGallery = apolloImages.collection.items[i];
            let imageTitle = imageGallery.data[0].title;
            let imageHref = imageGallery.links[0].href;
            apolloImagesArray.push({
                href: imageHref,
                title: imageTitle
            })
        }
        let apolloTitle = apolloImages.collection.items[0].data[0].title;
        let apolloImage = apolloImages.collection.items[0].links[0].href;
        console.log(apolloImage);
        $("#apolloTitle").text("Title: " + apolloTitle);
        $("#apolloImage").attr("src", apolloImage);
        $("#apolloImage").val(0);
    });



    const moonURL = "https://images-api.nasa.gov/search?q=moon&media_type=image"
    // ajax call for moon images
    $.ajax({
        url: moonURL,
        method: "GET"
    }).then(function (moonImages) {
        let moonTitle = moonImages.collection.items[0].data[0].title
        let moonImage = moonImages.collection.items[0].links[0].href
        $("#moonTitle").text("Title: " + moonTitle);
        $("#moonImage").attr("src", moonImage);
    });

    const sunURL = "https://images-api.nasa.gov/search?q=sun&media_type=image"
    // ajax call for sun images
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
    // ajax call for galaxy images
    $.ajax({
        url: galaxiesURL,
        method: "GET"
    }).then(function (galaxiesImages) {
        let galaxiesTitle = galaxiesImages.collection.items[0].data[0].title
        let galaxiesImage = galaxiesImages.collection.items[0].links[0].href
        $("#galaxiesTitle").text("Title: " + galaxiesTitle);
        $("#galaxiesImage").attr("src", galaxiesImage);
    });



    $(".nextButton").click(function () {
        console.log("this fired")
        let buttonGroup = $(this).parent().attr("id");
        console.log(buttonGroup)
        
        let apolloImageIndex = parseInt($("#" + buttonGroup + "Image").val());

        console.log($("#" + buttonGroup + "Image").val())

        apolloImageIndex++
        let nextPhoto = apolloImagesArray[apolloImageIndex];
        $("#" + buttonGroup + "Title").text("title: " + nextPhoto.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.href);
        $("#" + buttonGroup + "Image").val(apolloImageIndex);


    });

    $(".previousButton").click(function () {
        console.log("this fired")
        let buttonGroup = $(this).parent().attr("id");
        console.log(buttonGroup)
        
        let apolloImageIndex = parseInt($("#" + buttonGroup + "Image").val());

        console.log($("#" + buttonGroup + "Image").val())

        apolloImageIndex--
        let nextPhoto = apolloImagesArray[apolloImageIndex];
        $("#" + buttonGroup + "Title").text("title: " + nextPhoto.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.href);
        $("#" + buttonGroup + "Image").val(apolloImageIndex);


    });
});
