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


