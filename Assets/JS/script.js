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
        {rank: "Junior Cadet", badge: 'src="Assets/images/badges/junior-cadet.png"'},
        {rank: "Space Cadet", badge: 'src="Assets/images/badges/spaace-cadet.png"'},
        {rank: "Space Scout", badge: 'src="Assets/images/badges/space-scout.png"'},
        {rank: "Space Ranger", badge: 'src="Assets/images/badges/space-ranger.png"'},
        {rank: "Planetary Pilot", badge: 'src="Assets/images/badges/Planetary-Piolt.png"'},
        {rank: "Space Captin ", badge: 'src="Assets/images/badges/space-captian.png"'},
        {rank: "Senior Astronaut", badge: 'src="Assets/images/badges/senior-astronaugt.png"'},
        {rank: "Starship Commander", badge: 'src="Assets/images/badges/star-ship-commander.png"'},
        {rank: "Space Ace", badge: 'src="Assets/images/badges/space-ace.png"'},
        {rank: "Star Fleet Admiral", badge: 'src="Assets/images/badges/starfleet-commander.png"'},
        {rank: "Galactic Hero", badge: 'src="Assets/images/badges/galactic-hero.png"'},
        
    ]

    const rangerRankContainer = $("#ranger-rank-container");

    getRangerRank(rangerRank);
    
    function getRangerRank(GRR) {

        let retreiveVisitHistory = localStorage.getItem("visitHistory");
        console.log("retreiveVisitHistory for rank allocation =", retreiveVisitHistory);
        rangerRankContainer.empty();

        if (retreiveVisitHistory == "1"){
            rangerRankContainer.append('<h2>' + GRR[0].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[0].rank + 'badge "  ' + GRR[0].badge + 'style="width: 200px;" />');

        } else if (retreiveVisitHistory == "2"){
            console.log("rank level 2");
            rangerRankContainer.append('<h2>' + GRR[1].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[1].rank + 'badge "  ' + GRR[1].badge + ' style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "3"){
            rangerRankContainer.append('<h2>' + GRR[2].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[2].rank + 'badge " ' + GRR[2].badge + ' style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "4"){
            rangerRankContainer.append('<h2>' + GRR[3].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[3].rank + 'badge "  ' + GRR[3].badge + ' style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "5"){
            rangerRankContainer.append('<h2>' + GRR[4].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[4].rank + 'badge " ' + GRR[4].badge + ' style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "6"){
            rangerRankContainer.append('<h2>' + GRR[5].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[5].rank + 'badge " ' + GRR[5].badge + 'style="width: 200px;" />');

        } else if (retreiveVisitHistory == "7"){
            rangerRankContainer.append('<h2>' + GRR[6].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[6].rank + 'badge " ' + GRR[6].badge + ' style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "8"){
            rangerRankContainer.append('<h2>' + GRR[7].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[7].rank + 'badge " ' + GRR[7].badge + 'style="width: 200px;"/>');

        } else if (retreiveVisitHistory == "9"){
            rangerRankContainer.append('<h2>' + GRR[8].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[8].rank + 'badge " ' + GRR[8].badge + 'style="width: 200px;" />');

        } else if (retreiveVisitHistory == "10"){
            rangerRankContainer.append('<h2>' + GRR[9].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[9].rank + 'badge " ' + GRR[9].badge + 'style="width: 200px;" />');

        } else if (retreiveVisitHistory == "11"){
            rangerRankContainer.append('<h2>' + GRR[10].rank + '</h2>');
            rangerRankContainer.append('<img alt=" ' + GRR[10].rank + 'badge " ' + GRR[10].badge + 'style="width: 200px;"/>');

        } 
    }

});


function getTimeStamp() {
    return moment().format('LTS');
}

function getDateStamp() {
    return moment().format('ll');
}

