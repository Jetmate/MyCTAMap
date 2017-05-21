$(function(){
/*You code */
    
})

function initMap()
    {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 41.878398, lng: -87.630571}
    });
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
  }