$(function(){
/*You code */
  //Parse URL for Location and Destination Variables
  //if(getParameterByName("line")=="82")
  //{
    dest = "41.997346,-87.717074";
    loca = "41.837141,-87.711837";
  //}
  let currLoca = getParameterByName("currLocation");
  //let loca = getParameterByName('loca');
  //let dest = getParameterByName('dest');
  let locaPos = loca.indexOf(",");
  let destPos = dest.indexOf(",");
  let currPos = currLoca.indexOf(",");

  //Parse through values with string manipulation
  let latInit = loca.substring(0,locaPos);
  let lngInit = loca.substring(locaPos+1,loca.length);

  let latCurr = currLoca.substring(0,currPos);
  let lngCurr = currLoca.substring(currPos+1,currLoca.length);  

  let latDest = dest.substring(0,destPos);
  let lngDest = dest.substring(destPos+1,dest.length);

  //shift screen to bounds of initial position and the destination
  let initLoc = new google.maps.LatLng(latInit,lngInit)
  let destLoc = new google.maps.LatLng(latDest,lngDest)
  let currLoc = new google.maps.LatLng(latCurr,lngCurr)
  initDestBounds = new google.maps.LatLngBounds()
//  console.out(loca+dest);
  let locaString = initLoc.toString();
  let destString = destLoc.toString();
  let currString = currLoc.toString();
  console.log(locaString);
  console.log(destString);
  console.log(currString);
  marker = new google.maps.Marker({
    position: destLoc,
    map: map
  });
  marker = new google.maps.Marker({
    position: initLoc,
    map: map
  });
    marker = new google.maps.Marker({
    position: currLoc,
    map: map
  });
  initDestBounds.extend(destLoc);
  initDestBounds.extend(initLoc);
  map.fitBounds(initDestBounds);
  console.log("asdfdddfa")
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService,directionsDisplay,initLoc,destLoc);
  var dataSet = [];
  dataSet[0]= new google.maps.LatLng(41.902369,-87.712069)
  dataSet[1]= new google.maps.LatLng(41.917369,-87.712069)
  dataSet[2]= new google.maps.LatLng(41.95369,-87.712569)
  dataSet[3]= new google.maps.LatLng(41.89769,-87.712069)
  dataSet[4]= new google.maps.LatLng(41.86769,-87.712069)
  dataSet[4]= new google.maps.LatLng(41.85769,-87.712069)
  dataSet[4]= new google.maps.LatLng(41.83769,-87.712069)
  dataSet[5]= new google.maps.LatLng(41.912369,-87.712069)
  dataSet[6]= new google.maps.LatLng(41.927369,-87.712069)
  dataSet[7]= new google.maps.LatLng(41.93369,-87.712069)
  dataSet[8]= new google.maps.LatLng(41.84769,-87.712069)
  dataSet[9]= new google.maps.LatLng(41.87769,-87.712069)
  dataSet[10]= new google.maps.LatLng(41.86769,-87.712069)
  dataSet[11]= new google.maps.LatLng(41.97769,-87.712069)
  dataSet[12]= new google.maps.LatLng(41.94769,-87.712069)
  dataSet[13]= new google.maps.LatLng(41.96769,-87.713069)
  dataSet[14]= new google.maps.LatLng(41.96769,-87.713069)
  dataSet[13]= new google.maps.LatLng(41.98769,-87.713069)
  
  var image = 'Bus%20ICON.png';
  for(var i = 0; i<dataSet.length;i++)
  {
    marker = new google.maps.Marker({
    position: dataSet[i],
    map: map,
    icon: image
  });
  }
})


function calculateAndDisplayRoute(directionsService, directionsDisplay, origin,dest) {
    directionsService.route({
      origin: origin,  // Haight.
      destination: dest,  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: "TRANSIT"
      }, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

function evalRoute(directionResult,map){
  var transitInfo = [];
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    transitInfo.push({
      id: myRoute.steps[i].transit.line.short_name,
      vehicle: myRoute.steps[i].transit.line.vehicle
    })
    console.log(myRoute.steps[i].transit.line.short_name)
  }
}

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 41.878398, lng: -87.630571}
  });
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
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