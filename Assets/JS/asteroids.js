$(document).ready(function(){

    const neoAsteriodListContainer = $("#neo-asteroid-list-container");
    const moonListContainer = $("#moon-list-container");
    
    //date and time displayed on DASH    
    const dateContainer = $("#date");
    const timeContainer = $("#time");
    
    timeContainer.html(getTimeStamp());
    // console.log("GTS =",getTimeStamp());
    dateContainer.html(getDateStamp());
    
    const spaceWindscreen = $("#space-windscreen");
    spaceWindscreen.on("click","img", planetImgClicked);

    const moonNameListItem = $("#moon-list-container");
    moonNameListItem.on("click","p",moonNameClicked);

    const bodyNameSpanItm = $(".body-name");


    function planetImgClicked(){
        
        let bodyName = $(this).attr("alt");
        console.log(bodyName);
 
        solaireAjaxCall(bodyName);

        //body name needs adjustment 
        let adjustedNameReference = adjustReferenceForAjax(bodyName);
        nasaAjaxCallAsteroid(adjustedNameReference);
        // nasaAjaxCallComet(bodyName);

        bodyNameSpanItm.text(bodyName);
 
    }

    function adjustReferenceForAjax(referenceToChange){
        console.log("referenceToChange",referenceToChange);

        if (referenceToChange == "mercury"){
            // console.log("mercury has been chosen");
            return adjustedNameReference = "Merc";

        }else if (referenceToChange == "jupiter"){
            // console.log("jupiter has been chosen");
            return adjustedNameReference = "Juptr"; 

        }else if (referenceToChange == "saturn"){
            // console.log("saturn has been chosen");
            return adjustedNameReference = "Satrn";

        }else if (referenceToChange == "uranus"){
            // console.log("urunas has been chosen");
            return adjustedNameReference = "Urnus";

        }else if (referenceToChange == "neptune"){
            // console.log("neptune has been chosen");
            return adjustedNameReference = "Neptn";

        }else{
            // console.log("no change has been chosen");
            return adjustedNameReference = referenceToChange;
        }
    }
    

    function moonNameClicked() {

        // console.log("the click is fireing");

        let moonName = $(this).text();
        // console.log("moon name clicked",moonName);

        const moonNameadjustment1 = moonName.replaceAll("è","e");
        const moonNameadjustment2 = moonNameadjustment1.replaceAll("é","e")

        solaireAjaxCall(moonNameadjustment2);

        bodyNameSpanItm.text(moonName);
    }

    function solaireAjaxCall(passbodyid) {
        
        let solaireURL = "https://api.le-systeme-solaire.net/rest/bodies/" + passbodyid;
        
        // get api call
        $.ajax({ url: solaireURL, method: "GET" }).then(function(passbodyData){
            
            dealWithBodyData(passbodyData,passbodyid);
            
        })
    }
    
    function dealWithBodyData(receivedbodyData, receivedbodyid){
        console.log("body-data = ",receivedbodyData,"body-id = ", receivedbodyid);

        const isThisAPlanet = $("#is-planet");

        const discoveredByContainer = $("#discovered");
        const equatorRadiusContainer = $("#equator");
        
        const tiltContainer = $("#tilt");
        const massContainer = $("#mass");
        const volumeContainer = $("#volume");
        const gravityContainer = $("#gravity");
        const escapeContainer = $("#escape")

        let isAPlanet = receivedbodyData.isPlanet;
        // console.log("is a planet?",isAPlanet);

        if (isAPlanet == true){
            isThisAPlanet.text("This is a planet.");
        } else {
            isThisAPlanet.text("This is not a planet.");
        }
        
        let discoveredByWho = receivedbodyData.discoveredBy;
        let discoveredDate = receivedbodyData.discoveryDate;
        // console.log("discovery date = ",discoveredDate);
        // console.log("discovered by ", discoveredByWho);
        
        if (discoveredByWho == "") {
            discoveredByContainer.text("There is no discovery information.");
        } else {
            discoveredByContainer.html("Discovered By: " + discoveredByWho + "</br>" + discoveredDate);
        }
        
        let equatorRadius = receivedbodyData.equaRadius;
        // console.log("equator radius",equatorRadius);

        if (equatorRadius == "0") {
            let meanRadius = receivedbodyData.meanRadius;
            equatorRadiusContainer.html("Mean Radius: " + meanRadius + " km");

        } else {
            equatorRadiusContainer.html("Equatorial Radius: " + equatorRadius + " km");

        };

        const orbitAroundContainer = $("#orbit-around");
        
        let orbitAround = receivedbodyData.aroundPlanet;
        const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto" ];

        if (orbitAround == null) {

            let checkForSunOrbit = planets.indexOf(receivedbodyid);
            // console.log("checking for orbit of the sun =",checkForSunOrbit);
            if(checkForSunOrbit == -1){
                orbitAroundContainer.text("This body does not orbit anything.");

            }else{
                orbitAroundContainer.text("This planet orbits The Sun.");
            }

        } else {
            orbitAroundContainer.html("Orbiting Around: " + orbitAround.planet);
        }

        let tilt = receivedbodyData.axialTilt;
        // console.log("tilt",tilt);
        let density = receivedbodyData.density;

        if (tilt == 0) {
            tiltContainer.html("Density: <br/>" + density + " g/cm<sup>3</sup>");

        }else {
            tiltContainer.html("Tilt Angle: <br/>" + tilt + "&#176");
        }

        let massValue = receivedbodyData.mass.massValue;
        let massExponent = receivedbodyData.mass.massExponent;
        let massRounded = Math.round(massValue*100)/100;
        // console.log("mass",mass);
        // console.log("mass rounded",massRounded);

        let volumeValue = receivedbodyData.vol.volValue;
        let volumeExponent = receivedbodyData.vol.volExponent;
        let volumeRounded = Math.round(volumeValue*100)/100;
        // console.log("volume",volume);
        // console.log("volume rounded",volumeRounded);

        let gravityValue = receivedbodyData.gravity;
        // console.log("gravity",gravityValue);

        let escapeSpeedValue = receivedbodyData.escape
        
        massContainer.html("Mass: <br/>" + massRounded + " x 10<sup>" + massExponent + "</sup> kg");
        volumeContainer.html("Volume: <br/>" + volumeRounded + " x 10<sup>" + volumeExponent + "</sup> kg");
        gravityContainer.html("Gravity:  <br/>" + gravityValue + "m/s<sup>2</sup>");
        escapeContainer.html("Escape Speed:  <br/>" + escapeSpeedValue + "m/s<sup>-1</sup>");

        // moonListContainer
        let moonArray = receivedbodyData.moons;
        // console.log("moons",moonArray);

        moonListContainer.empty();

        if (moonArray == null){
            moonListContainer.text("There are no moons.")
        } else if (moonArray[0].moon === "La Lune"){

            moonListContainer.text("The Moon");

        } else {

            for ( i = 0; i<moonArray.length; i++){
                moonListContainer.append(
                    '<p class="moon-name">' + moonArray[i].moon + "</p>"
                );
            }

        };

    }
    

    // const testDate = moment().subtract(7, 'days').format("YYYY-MM-DD");
    // console.log("testDate",testDate);
    // const formatedTestDate = testDate.replaceAll("/","-");
    // console.log(formatedTestDate);
    // console.log(moment("YYYYMMDD"));

    
    function nasaAjaxCallAsteroid(passbodyid) {

        // console.log("nasa Ajax has body id =", passbodyid);

        let dateMin = "2019-02-16"; 
        // let dateMax = "2019-03-16";
        let distMax = "10LD";
        let body = passbodyid
        
        let nasaURL = "https://ssd-api.jpl.nasa.gov/cad.api?" +
            "dist-max=" + distMax + 
            "&date-min=" + dateMin + 
            // "&date-max=" + dateMax + 
            "&body=" + body + 
            "&kind=au";
            "&sort=dist";

        $.ajax({ url: nasaURL, method: "GET" }).then(function(passneoData){

            dealWithAsteroidData(passneoData);

        })
    }

    function dealWithAsteroidData(DealWneoData){
        // console.log("Asteroid data = ",DealWneoData);
        // console.log("Asteroid count = ",DealWneoData.count);
        // console.log("Asteroid count = ",DealWneoData.data[0][0]);
        // console.log("Asteroid count = ",DealWneoData.data[0][3]);

        let asteroidCount = DealWneoData.count;

        if (asteroidCount == "0"){

            // console.log("no asteroids");
            neoAsteriodListContainer.text("There have been no asteroids pass close by at this time");

        } else {

            console.log("some asteroids");
            neoAsteriodListContainer.html(
                DealWneoData.count + " Asteroids have close-approach status. <br/>" +
                "<h3>Top 5 closest:</h3><br/>" +
                "Name: " + DealWneoData.data[0][0] + "<br/>" +
                "Date: " + DealWneoData.data[0][3] + "<br/>" +
                "Approach Speed: " + DealWneoData.data[0][7] + " km/s <br/><br/>" +
    
                "Name: " + DealWneoData.data[1][0] + "<br/>" +
                "Date: " + DealWneoData.data[1][3] + "<br/>" +
                "Approach Speed: " + DealWneoData.data[1][7] + " km/s <br/><br/>" +
    
                "Name: " + DealWneoData.data[2][0] + "<br/>" +
                "Date: " + DealWneoData.data[2][3] + "<br/>" +
                "Approach Speed: " + DealWneoData.data[2][7] + " km/s <br/><br/>" +
    
                "Name: " + DealWneoData.data[3][0] + "<br/>" +
                "Date: " + DealWneoData.data[3][3] + "<br/>" +
                "Approach Speed: " + DealWneoData.data[3][7] + " km/s <br/><br/>" +
    
                "Name: " + DealWneoData.data[4][0] + "<br/>" +
                "Date: " + DealWneoData.data[4][3] + "<br/>" +
                "Approach Speed: " + DealWneoData.data[4][7] + " km/s <br/><br/>"
            );
        }
    }

    // function nasaAjaxCallComet(passbodyid) {

    //     // let dateMin = "2019-02-16"; 
    //     // let dateMax = "2019-03-16";
    //     let distMax = "10LD";
    //     let body = passbodyid
        
    //     let nasaURL = "https://ssd-api.jpl.nasa.gov/cad.api?" +
    //         "dist-max=" + distMax + 
    //         // "&date-min=" + dateMin + 
    //         // "&date-max=" + dateMax + 
    //         "&body=" + body + 
    //         "&kind=c";
    //         "&sort=dist";

    //     $.ajax({ url: nasaURL, method: "GET" }).then(function(passneoData){

    //         dealWithCometData(passneoData);

    //     })

    // }

    // function dealWithCometData(DealWneoData){
    //     console.log("Comet data = ",DealWneoData);
    //     console.log("Comet count = ",DealWneoData.count)
    //     console.log("Comet count = ",DealWneoData.data[0][0])
    //     console.log("Comet count = ",DealWneoData.data[0][3])

    //     neoAsteriodListContainer.html(
    //         DealWneoData.count + " asteroids have close-approach status. <br/>" +
    //         "<h3>Top 5 closest:</h3><br/>" +
    //         "Name: " + DealWneoData.data[0][0] + "<br/>" +
    //         "Date: " + DealWneoData.data[0][3] + "<br/>" +
    //         "Approach speed: " + DealWneoData.data[0][7] + " km/s <br/><br/>" +

    //         "Name: " + DealWneoData.data[1][0] + "<br/>" +
    //         "Date: " + DealWneoData.data[1][3] + "<br/>" +
    //         "Approach speed: " + DealWneoData.data[1][7] + " km/s <br/><br/>" +

    //         "Name: " + DealWneoData.data[2][0] + "<br/>" +
    //         "Date: " + DealWneoData.data[2][3] + "<br/>" +
    //         "Approach speed: " + DealWneoData.data[2][7] + " km/s <br/><br/>" +

    //         "Name: " + DealWneoData.data[3][0] + "<br/>" +
    //         "Date: " + DealWneoData.data[3][3] + "<br/>" +
    //         "Approach speed: " + DealWneoData.data[3][7] + " km/s <br/><br/>" +

    //         "Name: " + DealWneoData.data[4][0] + "<br/>" +
    //         "Date: " + DealWneoData.data[4][3] + "<br/>" +
    //         "Approach speed: " + DealWneoData.data[4][7] + " km/s <br/><br/>"
            
    //     );

    // }

    

});