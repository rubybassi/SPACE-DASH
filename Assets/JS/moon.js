const queryURL = "https://api.farmsense.net/v1/moonphases/?d=1350526582";
console.log(queryURL)
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (moonData) {
        let moonPhase = moonData[0].Phase
        console.log(moonPhase)
        let moonName = moonData[0].Moon[0]
        console.log(moonName)
        $('#moonHeader').text(moonPhase)
});




// moon[0].Moon
// moon[0].Index
// moon[0].Age
// moon[0].Phase
// moon[0].Distance
// moon[0].Illumination
// moon[0].AngularDiameter
// moon[0].DistanceToSun
// moon[0].SunAngularDiameter