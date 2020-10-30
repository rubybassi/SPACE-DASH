$(document).ready(function(){

    let bodyName = "mars" ;
    

    const neoAsteriodListContainer = $("#neo-asteroid-container");
    
    
    const dateContainer = $("#date");
    const timeContainer = $("#time");
    console.log(timeContainer);

    const testDate = moment().subtract(7, 'days').format("YYYY-MM-DD");
    console.log("testDate",testDate);
    const formatedTestDate = testDate.replaceAll("/","-");
    console.log(formatedTestDate);
    console.log(moment("YYYYMMDD"));
    
    timeContainer.html(getTimeStamp());
    console.log("GTS =",getTimeStamp());
    dateContainer.html(getDateStamp());
    
    solaireAjaxCall(bodyName);
    function solaireAjaxCall(passbodyid) {

        let solaireURL = "https://api.le-systeme-solaire.net/rest/bodies/" + passbodyid;

        // get api call
        $.ajax({ url: solaireURL, method: "GET" }).then(function(bodyData){

            dealWithBodyData(bodyData);

        })
    }

    function dealWithBodyData(bodyData){
        console.log("body data = ",bodyData);
        console.log("date = ", todaysDate);
    }

    nasaAjaxCall(bodyName)
    function nasaAjaxCall(passbodyid) {

        let dateMin = "2015-02-16"; 
        let dateMax = "2019-03-16";
        let distMax = "10LD";
        let body = passbodyid
        
        let nasaURL = "https://ssd-api.jpl.nasa.gov/cad.api?" +
            "dist-max=" + distMax + 
            "&date-min=" + dateMin + 
            "&date-max=" + dateMax + 
            "&body=" + body + 
            "&sort=dist";

        $.ajax({ url: nasaURL, method: "GET" }).then(function(neoData){

            dealWithNEOData(neoData);

        })

    }

    function dealWithNEOData(neoData){
        console.log("Neo data = ",neoData);
    }

    
    function issAjaxCall() {

        

    }

    










});