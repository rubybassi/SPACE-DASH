$(document).ready(function(){

    const neoAsteriodListContainer = $("#neo-asteroid-list-container");
    const moonListContainer = $("#moon-list-container");
    
    setInterval(function(){
        //date and time displayed on DASH    
        const dateContainer = $("#date");
        const timeContainer = $("#time");
        
        timeContainer.html(getTimeStamp());
        // console.log("GTS =",getTimeStamp());
        dateContainer.html(getDateStamp());

    },1000);
    
    const spaceWindscreen = $("#space-windscreen");
    spaceWindscreen.on("click","img", planetImgClicked);

    const moonNameListItem = $("#moon-list-container");
    moonNameListItem.on("click","p",moonNameClicked);

    const bodyNameSpanItm = $(".body-name");
    const captinSpeaking = $("#captin-speaking");

    const isThisAPlanet = $("#is-planet");

    const discoveredByContainer = $("#discovered");
    const equatorRadiusContainer = $("#equator");
    const orbitAroundContainer = $("#orbit-around");
        
    const tiltContainer = $("#tilt");
    const massContainer = $("#mass");
    const volumeContainer = $("#volume");
    const gravityContainer = $("#gravity");
    const escapeContainer = $("#escape");

    const onloadData = "earth";
        neoAsteriodListContainer.text("Fetching your asteroids...");
        captinSpeaking.text("Earth");
        console.log(onloadData);
        solaireAjaxCall(onloadData);
        nasaAjaxCallAsteroid(onloadData);
        $('.asteroidName').text(JSON.parse(localStorage.getItem('name'))); 


    function planetImgClicked(){
        
        let bodyName = $(this).attr("alt");
        // let bodyName = "no-data";
        console.log(bodyName);
 
        solaireAjaxCall(bodyName);

        //body name needs adjustment 
        let adjustedNameReference = adjustReferenceForAsteroid(bodyName);
        neoAsteriodListContainer.text("Fetching your asteroids...");
        nasaAjaxCallAsteroid(adjustedNameReference);
        // nasaAjaxCallComet(bodyName);

        bodyNameSpanItm.text(bodyName);
        captinSpeaking.text(bodyName);
 
    }

    function adjustReferenceForAsteroid(referenceToChange){
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
        console.log("moon name clicked",moonName);

        const moonNameadjustment1 = moonName.replaceAll("è","e");
        const moonNameadjustment2 = moonNameadjustment1.replaceAll("é","e");

        if (moonName == "There are no moons"){

            console.log("moonName has been caught as There are no moons");

            captinSpeaking.text("This is your captin speaking...");
            isThisAPlanet.text("Woops! this is not a moon, there is no data for this action. ");

            discoveredByContainer.text("");
            equatorRadiusContainer.text("");
            orbitAroundContainer.text("");
            
            tiltContainer.text("");
            massContainer.text("");
            volumeContainer.text("");
            gravityContainer.text("");
            escapeContainer.text("");

        }else if (moonName == "The Moon"){

            console.log("moonName has been caught as The Moon");

            moonNameadjustment2 = "moon";
            solaireAjaxCall(moonNameadjustment2);
    
            bodyNameSpanItm.text(moonName);
            captinSpeaking.text(moonName);

        }else{
            
            solaireAjaxCall(moonNameadjustment2);
    
            bodyNameSpanItm.text(moonName);
            captinSpeaking.text(moonName);

        }

    }

    function solaireAjaxCall(passbodyid) {
        
        let solaireURL = "https://api.le-systeme-solaire.net/rest/bodies/" + passbodyid;
        
        // get api call
        $.ajax({ url: solaireURL, method: "GET" }).then(function(passbodyData){

            dealWithBodyData(passbodyData,passbodyid);
            
        }).catch(noSolaireResults);
    }
    
    function dealWithBodyData(receivedbodyData, receivedbodyid){
        console.log("body-data = ",receivedbodyData,"body-id = ", receivedbodyid);

        let isAPlanet = receivedbodyData.isPlanet;
        // console.log("is a planet?",isAPlanet);

        if (isAPlanet == true){
            isThisAPlanet.text("This is a planet.");
        } else {
            isThisAPlanet.text('This is not a planet.');
        }
        
        let discoveredByWho = receivedbodyData.discoveredBy;
        let discoveredDate = receivedbodyData.discoveryDate;
        // console.log("discovery date = ",discoveredDate);
        // console.log("discovered by ", discoveredByWho);
        
        if (discoveredByWho == "") {
            discoveredByContainer.text("There is no discovery information.");
        } else {
            discoveredByContainer.html('<h3 class="data-name">Discovered By:' + discoveredByWho + "</br>" + discoveredDate + '</h3>');
        }
        
        let equatorRadius = receivedbodyData.equaRadius;
        // console.log("equator radius",equatorRadius);

        if (equatorRadius == "0") {
            let meanRadius = receivedbodyData.meanRadius;
            equatorRadiusContainer.html('<h3 class="data-name">Mean Radius:' + meanRadius + " km </h3>");

        } else {
            equatorRadiusContainer.html('<h3 class="data-name">Equatorial Radius: ' + equatorRadius + " km </h3>");

        };
        
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
            orbitAroundContainer.html('<h3 class="data-name">Orbiting Around:' + orbitAround.planet + '</h3>');
        }

        let tilt = receivedbodyData.axialTilt;
        // console.log("tilt",tilt);
        let density = receivedbodyData.density;

        if (tilt == 0) {
            tiltContainer.html('<p class="data-name">Density: </p><h3>' + density + " g/cm<sup>3</sup></h3>");

        }else {
            tiltContainer.html('<p class="data-name">Tilt Angle: </p><h3>' + tilt + "&#176</h3>");
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
        
        massContainer.html('<p class="data-name">Mass: </p><h3>' + massRounded + " x 10<sup>" + massExponent + "</sup> kg </h3>");
        volumeContainer.html('<p class="data-name">Volume: </p><h3>' + volumeRounded + " x 10<sup>" + volumeExponent + "</sup> kg </h3>");
        gravityContainer.html('<p class="data-name">Gravity: </p><h3>' + gravityValue + "m/s<sup>2</sup> </h3>");
        escapeContainer.html('<p class="data-name">Escape Speed: </p><h3>' + escapeSpeedValue + "m/s<sup>-1</sup> </h3>");

        // moonListContainer
        let moonArray = receivedbodyData.moons;
        // console.log("moons",moonArray);

        moonListContainer.empty();

        if (moonArray == null){
            moonListContainer.append('<p class="moon-name"> There are no moons </p>');
        } else if (moonArray[0].moon === "La Lune"){

            moonListContainer.append('<p class="moon-name">' + "The Moon" + "</p>");

        } else {

            for ( i = 0; i<moonArray.length; i++){
                moonListContainer.append(
                    '<p class="moon-name">' + moonArray[i].moon + "</p>"
                );
            }

        };

    }
    
    function noSolaireResults(error){

        captinSpeaking.text("This is your captin speaking...");
        isThisAPlanet.text("I'm sorry, there has been an error fetching the data of your planet. Please try again another time. ");

        discoveredByContainer.text("Warning!");
        equatorRadiusContainer.text("Warning!");
        orbitAroundContainer.text("Warning!");
        
        tiltContainer.text("This");
        massContainer.text("is");
        volumeContainer.text("not");
        gravityContainer.text("a");
        escapeContainer.text("drill.");

    }

    
    
    function nasaAjaxCallAsteroid(passbodyid) {
        
        // console.log("nasa Ajax has body id =", passbodyid);
        const formatDate = moment().format("YYYY-MM-DD");
        console.log("formatDate",formatDate);
        
        const todayDate = moment().format("YYYY-MM-DD");
        console.log("todayDate", todayDate);

        let dateMin = todayDate; 
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
    
        }).catch(noAsteroidResults);

        // $.ajax({ url: nasaURL, method: "GET" }).then(function(passneoData){

        //     console.log("passneoData count = ", passneoData.count);
        //     const neoDataCount = passneoData.count
        //     if ( neoDataCount > 5){

        //         dealWithAsteroidData(passneoData);
        //     } else {

        //         for(count = neoDataCount; count<5; count++);

        //     }


        // }).catch(noAsteroidResults);
    }

    function dealWithAsteroidData(DealWneoData){
        console.log("Asteroid data = ",DealWneoData);
        // console.log("Asteroid count = ",DealWneoData.count);
        // console.log("Asteroid count = ",DealWneoData.data[0][0]);
        // console.log("Asteroid count = ",DealWneoData.data[0][3]);

        let asteroidCount = DealWneoData.count;

        if (asteroidCount == "0"){

            // console.log("no asteroids");
            neoAsteriodListContainer.empty();
            neoAsteriodListContainer.text("There have been no asteroids pass close by at this time");

        } else {

            console.log("some asteroids");
            neoAsteriodListContainer.html(
                DealWneoData.count + " Asteroids have close-approach status. <br/>" +
                "<h3>Top 5 closest:</h3><br/>" +
                "Name: " + DealWneoData.data[0][0] + "<br/>" +
                "Date: " + DealWneoData.data[0][3] + "<br/>" +
                "Approach Speed: " + Math.round(DealWneoData.data[0][7]) + " km/s <br/>" +
                "Approach distance: " + Math.round(DealWneoData.data[0][4]*150000000) + " km <br/><br/>" +
    
                "Name: " + DealWneoData.data[1][0] + "<br/>" +
                "Date: " + DealWneoData.data[1][3] + "<br/>" +
                "Approach Speed: " + Math.round(DealWneoData.data[1][7]) + " km/s <br/>" +
                "Approach distance: " + Math.round(DealWneoData.data[1][4]*150000000) + " km <br/><br/>" +
    
                "Name: " + DealWneoData.data[2][0] + "<br/>" +
                "Date: " + DealWneoData.data[2][3] + "<br/>" +
                "Approach Speed: " + Math.round(DealWneoData.data[2][7]) + " km/s <br/>" +
                "Approach distance: " + Math.round(DealWneoData.data[2][4]*150000000) + " km <br/><br/>" +
    
                "Name: " + DealWneoData.data[3][0] + "<br/>" +
                "Date: " + DealWneoData.data[3][3] + "<br/>" +
                "Approach Speed: " + Math.round(DealWneoData.data[3][7]) + " km/s <br/>" +
                "Approach distance: " + Math.round(DealWneoData.data[3][4]*150000000) + " km <br/><br/>" +
    
                "Name: " + DealWneoData.data[4][0] + "<br/>" +
                "Date: " + DealWneoData.data[4][3] + "<br/>" +
                "Approach Speed: " + Math.round(DealWneoData.data[4][7]) + " km/s <br/>" +
                "Approach distance: " + Math.round(DealWneoData.data[4][4]*150000000) + " km <br/><br/>" 
            );
        }
    }

    function noAsteroidResults(error){
        neoAsteriodListContainer.text("Sorry something crashed into your asteroids and we can't display them at this time.")
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