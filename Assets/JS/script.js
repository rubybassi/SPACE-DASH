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

    const rangerRankBadge = $("#ranger-rank-badge");
    const rangerRankTitle = $("#ranger-rank-title");

    getRangerRank(rangerRank);
    
    function getRangerRank(GRR) {

        let retreiveVisitHistory = localStorage.getItem("visitHistory");
        console.log("retreiveVisitHistory for rank allocation =", retreiveVisitHistory);
        rangerRankTitle.empty();
        rangerRankBadge.empty();

        if (retreiveVisitHistory == "1"){
          rangerRankTitle.append('<h2>' + GRR[0].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[0].rank + 'badge "  ' + GRR[0].badge + 'style="width: 100%;" />');

        } else if (retreiveVisitHistory == "2"){
          console.log("rank level 2");
          rangerRankTitle.append('<h2>' + GRR[1].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[1].rank + 'badge "  ' + GRR[1].badge + ' style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "3"){
          rangerRankTitle.append('<h2>' + GRR[2].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[2].rank + 'badge " ' + GRR[2].badge + ' style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "4"){
          rangerRankTitle.append('<h2>' + GRR[3].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[3].rank + 'badge "  ' + GRR[3].badge + ' style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "5"){
          rangerRankTitle.append('<h2>' + GRR[4].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[4].rank + 'badge " ' + GRR[4].badge + ' style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "6"){
          rangerRankTitle.append('<h2>' + GRR[5].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[5].rank + 'badge " ' + GRR[5].badge + 'style="width: 100%;" />');

        } else if (retreiveVisitHistory == "7"){
          rangerRankTitle.append('<h2>' + GRR[6].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[6].rank + 'badge " ' + GRR[6].badge + ' style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "8"){
          rangerRankTitle.append('<h2>' + GRR[7].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[7].rank + 'badge " ' + GRR[7].badge + 'style="width: 100%;"/>');

        } else if (retreiveVisitHistory == "9"){
          rangerRankTitle.append('<h2>' + GRR[8].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[8].rank + 'badge " ' + GRR[8].badge + 'style="width: 100%;" />');

        } else if (retreiveVisitHistory == "10"){
          rangerRankTitle.append('<h2>' + GRR[9].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[9].rank + 'badge " ' + GRR[9].badge + 'style="width: 100%;" />');

        } else if (retreiveVisitHistory == "11"){
          rangerRankTitle.append('<h2>' + GRR[10].rank + '</h2>');
          rangerRankBadge.append('<img alt=" ' + GRR[10].rank + 'badge " ' + GRR[10].badge + 'style="width: 100%;"/>');

        } 
    }
	
		// button event listener to capture user name
		const userInput = $('#name');
		$('#nameBtn').on('click', (event) => {
			event.preventDefault();
			const name = $(userInput).val().toUpperCase();
			if (name === "") {
        localStorage.setItem('name', JSON.stringify('friend'));
        getName(name);
        $('#userInput').empty();
			} else {
        $('#headerText h1').empty();
				setName(name);
        getName(name);
        $('#userInput').empty();
			}
		});
		
		// save name to local storage
		const setName = (name) => {
		localStorage.setItem('name', JSON.stringify(name));
		}
    
		// retrieve name from storage
		const getName = (name) => {
		const storedName = JSON.parse(localStorage.getItem('name'));
		$('#headerText h1').text(`Hello ${storedName}! Get ready to explore the wonders of space...`);
		return storedName;    
		}

		nasaAjaxCallAsteroid()
		function nasaAjaxCallAsteroid() {
        
			// console.log("nasa Ajax has body id =", passbodyid);
			const formatDate = moment().format("YYYY-MM-DD");
			console.log("formatDate",formatDate);
			
			const todayDate = moment().format("YYYY-MM-DD");
			console.log("todayDate", todayDate);

			let dateMin = todayDate; 
			// let dateMax = "2019-03-16";
			let distMax = "10LD";
			let body = "earth";
			
			let nasaURL = "https://ssd-api.jpl.nasa.gov/cad.api?" +
					"dist-max=" + distMax + 
					"&date-min=" + dateMin + 
					// "&date-max=" + dateMax + 
					"&body=" + body + 
					"&kind=au";
					"&sort=dist";

			$.ajax({ url: nasaURL, method: "GET" }).then(function(passneoCount){

					dealWithAsteroidCount(passneoCount);
	
			})
	}

	function dealWithAsteroidCount(DealWneoCount){
		console.log("Asteroid data = ",DealWneoCount);

				let asteroidCount = DealWneoCount.count;
				const noneoBox = $("h3.Near-earth-objects");
				noneoBox.text(asteroidCount);
	}

});


function getTimeStamp() {
  return moment().format('LTS');
}

function getDateStamp() {
  return moment().format('ll');
}

