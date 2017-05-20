
var currentLocation;
var destination;
var location;
console.log("asdfasdf");

destination = getParameterByName('destination');
currentLocation = getParameterByName('currLocation');
console.log(destination);
console.log(currentLocation);

if(destination!=null&&currentLocation!=null){
	console.log("asdf")
	window.location.replace("MapDraw/index.html?loca="+currentLocation+"&dest="+destination);
}

window.onload=function() {
  document.getElementById("form1").onsubmit=function() {
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}