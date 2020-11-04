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

});


function getTimeStamp() {
    return moment().format('LTS');
}

function getDateStamp() {
    return moment().format('ll');
}


// button event listener to capture user name
const userInput = $('#name');
$('#nameBtn').on('click', (event) => {
  event.preventDefault();
  $('#headerText h1').empty();
  const name = $(userInput).val().toUpperCase();
  if (name === "") {
   alert("please add name");
	} else {
		setName(name);
        getName(name);    
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
