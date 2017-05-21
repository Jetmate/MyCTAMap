
let currentLocation;
let destination;

let line = getParameterByName('destination');
let currentLocation = getParameterByName('currLocation');
let bus = getParameterByName('transitType');
/*if(line == "82")
{
  destination = "41.997346,-87.717074";
  start = "41.837141,-87.711837";
}
/*if(){
  destLat = destination.substring(0,)
  destLng = destination.substring(destination.indexOf(,))
  if(){
    currLat = 
    currLng = 
  }
  else
}
else
if(!resultDest&&!resultLoca)
{
  console.log("hey we have a place");
}
else if((resultDest&&!resultLoca)||(!resultDest&&resultLoca))
{
  console.log("hey we have weird shit");
}
*/
if(line!=null&&currentLocation!=null){
	console.log("asdf")
	window.location.replace("MapDraw/index.html?currLocation="+currentLocation+"&destination="+line+"&transitType="+bus);
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