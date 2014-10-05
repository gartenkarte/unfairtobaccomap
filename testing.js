var map = L.map('map').setView( new L.LatLng(20, 10), 2);
var toner = new L.StamenTileLayer("toner");
map.addLayer(toner);

var baseLayers = {
  "Toner": toner
};

L.control.layers(baseLayers).addTo(map);



function condense_locations ( element ) {
  var callback = [];
  callback[0] = unfairtobacco.locations[element].latitude;
  callback[1] = unfairtobacco.locations[element].longitude;
  console.log(callback);
  return callback;
}

function replace_locations ( element ) {
  var copy = $.extend(true, {}, element, copy);
  copy.locations = $.map(element.locations, condense_locations);
  return copy;
}

function api_to_leaflet_layer ( dictionary ) {
  result = [];

  for (var key in dictionary) {
    var obj = dictionary[key];
    if (obj.locations[0] != null) {
      result.push(L.marker (replace_locations(obj).locations))
    }
/*    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)){
        console.log(prop);
      }
    } */
  };

  return result;
}



var unfairtobacco;
var projekte_layer;
$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  projekte_layer = api_to_leaflet_layer(unfairtobacco.projects);
  console.log(projekte_layer);
  projects_in_layer = L.layerGroup(projekte_layer);
  console.log(projects_in_layer);
  projects_in_layer.addTo(map);
});