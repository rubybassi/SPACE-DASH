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

    setInterval(function(){
        
        let dateOfDay = getDateStamp();
        let timeOfDay = getTimeStamp();
        $("#date-header").text(dateOfDay);
        $("#time-header").text(timeOfDay);
        
    },1000)

    // visit history for ranger rank. - need to control load by specific page.
    let visitHistory; 
    
    getHistory(visitHistory);
    

    function saveHistory(SVH) {
        console.log("value received =", SVH);
        let saveVisitHistory = localStorage.setItem("visitHistory",JSON.stringify(SVH));
        console.log("saveVisitHistory =", saveVisitHistory);
    }

    function getHistory(GH) {

        let retreiveVisitHistory = localStorage.getItem("visitHistory");
        console.log("retreiveVisitHistory", retreiveVisitHistory);
        
        if (retreiveVisitHistory == null) {
            GH = 1;
            console.log("welcome new cadet", GH);
            saveHistory(GH);
            
        } else {
            
            showVisitHistory = JSON.parse(retreiveVisitHistory);
            console.log("showVisitHistory =", showVisitHistory);
            console.log("welcome back", GH);
            showVisitHistory++;
            console.log("incGH = ",showVisitHistory);
            saveHistory(showVisitHistory);
         
        }
    }

});


function getTimeStamp() {
    return moment().format('LTS');
}

function getDateStamp() {
    return moment().format('ll');
}

