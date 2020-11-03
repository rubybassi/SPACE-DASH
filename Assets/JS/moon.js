
const queryURL = "https://api.farmsense.net/v1/moonphases/?d=1350526582";
//console.log(queryURL)
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (moonData) {



        
    }
}



    
)
.catch();

// }).then(function (apolloImages) {
//     for (let i = 0; i < apolloImages.collection.items.length; i++) {
//         let imageGallery = apolloImages.collection.items[i];
//         let imageTitle = imageGallery.data[0].title;
//         let imageHref = imageGallery.links[0].href;
//         completeImagesArray.apollo.push({
//             href: imageHref,
//             title: imageTitle
//         })
//     }
//     let apolloTitle = apolloImages.collection.items[0].data[0].title;
//     let apolloImage = apolloImages.collection.items[0].links[0].href;
//     $("#apolloTitle").text(apolloTitle);
//     $("#apolloImage").attr("src", apolloImage);
//     $("#apolloImage").val(0);
// });

// moon[0].Moon
// moon[0].Index
// moon[0].Age
// moon[0].Phase
// moon[0].Distance
// moon[0].Illumination
// moon[0].AngularDiameter
// moon[0].DistanceToSun
// moon[0].SunAngularDiameter

const moon = [
]

var  icon = "Assets\CSS\weather-icons.css" 