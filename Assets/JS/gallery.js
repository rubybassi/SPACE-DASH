$(document).ready(function () {

    //object to hold all the seperate arrays for apollo, moon, sun and galaxy
    let completeImagesArray = { apollo: [], moon: [], sun: [], galaxies: [] }
    // url for apollo images
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
        $("#apolloTitle").text(apolloTitle);
        $("#apolloImage").attr("src", apolloImage);
        $("#apolloImage").val(0);
    });


    // url for moon images
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
        $("#moonTitle").text(moonTitle);
        $("#moonImage").attr("src", moonImage);
        $("#moonImage").val(0)
    });

     // url for sun images
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
        $("#sunTitle").text(sunTitle);
        $("#sunImage").attr("src", sunImage);
        $("#sunImage").val(0);
    });

    // url for galaxies images
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
            completeImagesArray.galaxies.push({
                href: imageHref,
                title: imageTitle
            });
        }
        let galaxiesTitle = galaxiesImages.collection.items[0].data[0].title
        let galaxiesImage = galaxiesImages.collection.items[0].links[0].href
        $("#galaxiesTitle").text(galaxiesTitle);
        $("#galaxiesImage").attr("src", galaxiesImage);
        $("#galaxiesImage").val(0);
    });


    // when next button is clicked, the next picture and title in the array will display
    $(".nextButton").click(function () {
        let buttonGroup = $(this).parent().attr("id");
        console.log(buttonGroup);
        let allImageIndex = parseInt($("#" + buttonGroup + "Image").val());
        allImageIndex++
        let nextPhoto = completeImagesArray[buttonGroup][allImageIndex];
        console.log(nextPhoto)
        $("#" + buttonGroup + "Title").text(nextPhoto.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.href);
        $("#" + buttonGroup + "Image").val(allImageIndex);
    });

    //when previous button is clicked, the previous picture and title in the array will display
    $(".previousButton").click(function () {
        let buttonGroup = $(this).parent().attr("id");
        let allImageIndex = parseInt($("#" + buttonGroup + "Image").val());
        allImageIndex--
        let nextPhoto = completeImagesArray[buttonGroup][allImageIndex];
        $("#" + buttonGroup + "Title").text(nextPhoto.title);
        $("#" + buttonGroup + "Image").attr("src", nextPhoto.href);
        $("#" + buttonGroup + "Image").val(allImageIndex);
    });
});
