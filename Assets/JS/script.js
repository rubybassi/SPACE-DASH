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

    // visit history for ranger rank. - need to control load by specific page?
    let visitHistory; 
    let sessionVisit;

    getSessionStorage(sessionVisit);
    getHistory(visitHistory);

    // session storage - this increases as each page is loaded, but the Local strorage only increases when the whole site is visited. 
    function saveSession(SS) {
        console.log("session value received =", SS);
        let saveSessionHistory = sessionStorage.setItem("sessionHistory",JSON.stringify(SS));
    }

    function getSessionStorage(GSS) {

        let retreiveSessionHistory = sessionStorage.getItem("sessionHistory");
        console.log("retreiveSessionHistory", retreiveSessionHistory);
        
        if (retreiveSessionHistory == null) {
            GSS = 1;
            console.log("welcome session cadet", GSS);
            saveSession(GSS);
            
        } else {
            
            showSessionHistory = JSON.parse(retreiveSessionHistory);
            console.log("showSessionHistory =", showSessionHistory);
            console.log("Still in the same session", showSessionHistory);
            showSessionHistory++;
            console.log("GSS = ",showSessionHistory);
            saveSession(showSessionHistory);
         
        }
    }

    // local storage this only increases when the whole site is visited, while session storage increses each page load. 
    function saveHistory(SVH) {
        console.log("visit value received =", SVH);
        let saveVisitHistory = localStorage.setItem("visitHistory",JSON.stringify(SVH));
        // console.log("saveVisitHistory =", saveVisitHistory);
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
            console.log("welcome back", showVisitHistory);

            let conditionSessionHistory = sessionStorage.getItem("sessionHistory");
            console.log("conditionSessionHistory", conditionSessionHistory);
            if (conditionSessionHistory <= 1 ){
                showVisitHistory++;
                console.log("GH = ",showVisitHistory);
                saveHistory(showVisitHistory);

            } else{
                console.log("your still here", showVisitHistory);
            }
         
        }
    }

    //Ranger rank 
    const rangerRank = [
        {rank: "Junior Cadet", badge: ""},
        {rank: "Space Cadet", badge: ""},
        {rank: "Space Scout", badge: ""},
        {rank: "Space Ranger", badge: ""},
        {rank: "Planetary Pilet", badge: ""},
        {rank: "Space Captin ", badge: ""},
        {rank: "Senior Astronaut", badge: ""},
        {rank: "Starship Commander", badge: ""},
        {rank: "Space Ace", badge: ""},
        {rank: "Star Fleet Admiral", badge: ""},
        {rank: "Galactic Hero", badge: ""},
        
    ]

    const rangerRankContainer = $("#ranger-rank-container");

    getRangerRank(rangerRank);
    
    function getRangerRank(GRR) {

        let retreiveVisitHistory = localStorage.getItem("visitHistory");
        console.log("retreiveVisitHistory for rank allocation =", retreiveVisitHistory);
        // rangerRankContainer.empty();

        if (retreiveVisitHistory == "1"){
            rangerRankContainer.append('<h2>' + GRR[0].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[0].rank + 'badge " src=" ' + GRR[0].badge + ' "/>');

        } else if (retreiveVisitHistory == "2"){
            console.log("rank level 2");
            rangerRankContainer.append('<h2>' + GRR[1].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[1].rank + 'badge " src=" ' + GRR[1].badge + ' "/>');

        } else if (retreiveVisitHistory == "3"){
            rangerRankContainer.append('<h2>' + GRR[2].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[2].rank + 'badge " src=" ' + GRR[2].badge + ' "/>');

        } else if (retreiveVisitHistory == "4"){
            rangerRankContainer.append('<h2>' + GRR[3].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[3].rank + 'badge " src=" ' + GRR[3].badge + ' "/>');

        } else if (retreiveVisitHistory == "5"){
            rangerRankContainer.append('<h2>' + GRR[4].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[4].rank + 'badge " src=" ' + GRR[4].badge + ' "/>');

        } else if (retreiveVisitHistory == "6"){
            rangerRankContainer.append('<h2>' + GRR[5].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[5].rank + 'badge " src=" ' + GRR[5].badge + ' "/>');

        } else if (retreiveVisitHistory == "7"){
            rangerRankContainer.append('<h2>' + GRR[6].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[6].rank + 'badge " src=" ' + GRR[6].badge + ' "/>');

        } else if (retreiveVisitHistory == "8"){
            rangerRankContainer.append('<h2>' + GRR[7].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[7].rank + 'badge " src=" ' + GRR[7].badge + ' "/>');

        } else if (retreiveVisitHistory == "9"){
            rangerRankContainer.append('<h2>' + GRR[8].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[8].rank + 'badge " src=" ' + GRR[8].badge + ' "/>');

        } else if (retreiveVisitHistory == "10"){
            rangerRankContainer.append('<h2>' + GRR[9].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[9].rank + 'badge " src=" ' + GRR[9].badge + ' "/>');

        } else if (retreiveVisitHistory == "11"){
            rangerRankContainer.append('<h2>' + GRR[10].rank + '</h2>');
            // rangerRankContainer.append('<img alt=" ' + GRR[10].rank + 'badge " src=" ' + GRR[10].badge + ' "/>');

        } 
    }

});


function getTimeStamp() {
    return moment().format('LTS');
}

function getDateStamp() {
    return moment().format('ll');
}

