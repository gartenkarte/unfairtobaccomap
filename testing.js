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
  //console.log(callback);
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

function condense_geojson_locations ( element ) {
  var callback = [];
  callback[0] = unfairtobacco.locations[element].longitude;
  callback[1] = unfairtobacco.locations[element].latitude;
  //console.log(callback);
  return callback;
}


function replace_geojson_locations ( element ) {
  var copy = $.extend(true, {}, element, copy);
  copy.locations = $.map(element.locations, condense_geojson_locations);
  return copy;
}

function render_to_geojson ( projects ) {
  var geojson_projects = {};
  geojson_projects['type'] = 'FeatureCollection';
  geojson_projects['features'] = [];


  for (var k in projects) {
    var obj = projects[k];
    if (obj.locations[0] != null) {
      var newFeature = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": replace_geojson_locations(obj).locations
      },
      "properties": {
        "title": projects[k].name,
        "description": projects[k].description
      }
    };
    geojson_projects['features'].push(newFeature);  
    };
    
  };
  return geojson_projects;
}

var unfairtobacco;
var projekte_layer;
$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  
  //projekte_layer = api_to_leaflet_layer(unfairtobacco.projects);
  //console.log(projekte_layer);
  
  projekte_geojson = render_to_geojson(unfairtobacco.projects);
  //console.log(projekte_geojson);

  //projects_in_layer = L.layerGroup(projekte_layer);
  //console.log(projects_in_layer);
  
  //projects_in_layer.addTo(map);

    var Layer_project = L.geoJson(projekte_geojson, {
        onEachFeature: OnEachFeatureFunction
    }).addTo(map);

});




function OnEachFeatureFunction(feature, marker){
    if (feature.properties.name) {
        marker.bindPopup('<b>' + feature.properties.name + '</b>'
                        );
        marker.on('mouseover', function () {
            this.openPopup();
                        });
        marker.on('mouseout', function () {
            this.closePopup();
                        });
    }
};
