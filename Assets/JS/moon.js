const getData =  () => {
const queryURL = "https://www.icalendar37.net/lunar/api/?";
$.ajax({
url:queryURL
})
};


//function load_moon_phases(obj,callback){
//    var gets=[]
//    for (var i in obj){
//        gets.push(i + "=" +encodeURIComponent(obj[i]))
//    }
//    gets.push("LDZ=" + new Date(obj.year,obj.month-1,1) / 1000)
//    var xmlhttp = new XMLHttpRequest()
//    var url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&")
//    xmlhttp.onreadystatechange = function() {
//        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//            callback(JSON.parse(xmlhttp.responseText))
//        }
//    }
//    xmlhttp.open("GET", url, true)
//    xmlhttp.send()
//}
