$(function(){
/*You code */
  //Parse URL for Location and Destination Variables
  let loca = getParameterByName('loca');
  let dest = getParameterByName('dest');
  let locaPos = loca.indexOf(",");
  let destPos = dest.indexOf(",");

  //Parse through values with string manipulation
  let latInit = loca.substring(0,locaPos);
  let lngInit = loca.substring(locaPos+1,loca.length);

  let latDest = dest.substring(0,destPos);
  let lngDest = dest.substring(destPos+1,dest.length);

  //shift screen to bounds of initial position and the destination
  let initLoc = new google.maps.LatLng(latInit,lngInit)
  let destLoc = new google.maps.LatLng(latDest,lngDest)
  let initDestBounds = new google.maps.LatLngBounds()
//  console.out(loca+dest);
  let locaString = initLoc.toString();
  let destString = destLoc.toString();
  console.log(locaString);
  console.log(destString);
    map.setZoom(25)
  marker = new google.maps.Marker({
    position: destLoc,
    map: map
  });
  marker = new google.maps.Marker({
    position: initLoc,
    map: map
  });
  initDestBounds.extend(destLoc);
  initDestBounds.extend(initLoc);
  map.fitBounds(initDestBounds);
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService,directionsDisplay,initLoc,destLoc);
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