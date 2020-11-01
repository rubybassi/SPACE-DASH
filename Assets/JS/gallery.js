$(document).ready(function () {

    let completeImagesArray = {apollo: [], moon: [], sun:[], galaxy:[]}

    console.log(completeImagesArray)
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
            completeImagesArray.apollo.push({
                href: imageHref,
                title: imageTitle
            })
        }
        let apolloTitle = apolloImages.collection.items[0].data[0].title;
        let apolloImage = apolloImages.collection.items[0].links[0].href;
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
        for (let i = 0; i < moonImages.collection.items.length; i++) {
            let imageGallery = moonImages.collection.items[i];
            let imageTitle = imageGallery.data[0].title;
            let imageHref = imageGallery.links[0].href;
            completeImagesArray.moon.push({
                href: imageHref,
                title: imageTitle
            })
        }
        let moonTitle = moonImages.collection.items[0].data[0].title
        let moonImage = moonImages.collection.items[0].links[0].href
        $("#moonTitle").text("Title: " + moonTitle);
        $("#moonImage").attr("src", moonImage);
        $("#moonImage").val(0)
    });

    const sunURL = "https://images-api.nasa.gov/search?q=sun&media_type=image"
    // ajax call for sun images
    $.ajax({
        url: sunURL,
        method: "GET"
    }).then(function (sunImages) {
        for (let i = 0; i < sunImages.collection.items.length; i++) {
            let imageGallery = sunImages.collection.items[i];
            let imageTitle = imageGallery.data[0].title;
            let imageHref = imageGallery.links[0].href;
            completeImagesArray.sun.push({
                href: imageHref,
                title: imageTitle
            })
        }
        let sunTitle = sunImages.collection.items[0].data[0].title
        let sunImage = sunImages.collection.items[0].links[0].href
        $("#sunTitle").text("Title: " + sunTitle);
        $("#sunImage").attr("src", sunImage);
        $("#sunImage").val(0);
    });

    const galaxiesURL = "https://images-api.nasa.gov/search?q=galaxies&media_type=image"
    // ajax call for galaxy images
    $.ajax({
        url: galaxiesURL,
        method: "GET"
    }).then(function (galaxiesImages) {
        for (let i = 0; i < galaxiesImages.collection.items.length; i++) {
            let imageGallery = galaxiesImages.collection.items[i];
            let imageTitle = imageGallery.data[0].title;
            let imageHref = imageGallery.links[0].href;
            completeImagesArray.galaxy.push({
                href: imageHref,
                title: imageTitle
            });
        }
        let galaxiesTitle = galaxiesImages.collection.items[0].data[0].title
        let galaxiesImage = galaxiesImages.collection.items[0].links[0].href
        $("#galaxiesTitle").text("Title: " + galaxiesTitle);
        $("#galaxiesImage").attr("src", galaxiesImage);
        $("#galaxiesImage").val(0);
    });



    $(".nextButton").click(function () {
        let buttonGroup = $(this).parent().attr("id");
        let allImageIndex = parseInt($("#" + buttonGroup + "Image").val());
        allImageIndex++
        let nextPhoto = completeImagesArray[allImageIndex];
        $("#" + buttonGroup + "Title").text("title: " + nextPhoto.buttonGroup.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.buttonGroup.href);
        $("#" + buttonGroup + "Image").val(allImageIndex);
    });

    $(".previousButton").click(function () {
        let buttonGroup = $(this).parent().attr("id");
        let allImageIndex = parseInt($("#" + buttonGroup + "Image").val());
        allImageIndex--
        let nextPhoto = completeImagesArray[allImageIndex];
        $("#" + buttonGroup + "Title").text("title: " + nextPhoto.buttonGroup.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.buttonGroup.href);
        $("#" + buttonGroup + "Image").val(alloImageIndex);
    });
});
