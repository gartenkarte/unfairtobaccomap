var map = L.map('map').setView( new L.LatLng(20, 10), 2);
var toner = new L.StamenTileLayer("toner");
map.addLayer(toner);

var baseLayers = {
  "Toner": toner
};

L.control.layers(baseLayers).addTo(map);

// POPUPS

function OnEachFeature(feature, layer){
    if (feature.properties && feature.properties.name) {
        layer.bindPopup('<b>' + feature.properties.name + '</b>'
                        );
        layer.on('mouseover', function () {
            this.openPopup();
                        });
        layer.on('mouseout', function () {
            this.closePopup();
                        });
    }
};

/*
function OnEachFeature(feature, layer){
    if (feature.properties.name) {
        layer.bindPopup('<b>' + feature.properties.name + '</b>' + '<br>' +
                        feature.properties.desc + '<br>' +
                        '<b>' + 'Website: ' + '</b>' + feature.properties.url + '<br>' +
                        '<b>' +'Contact: ' + '</b>' + feature.properties.mail
                        );
        }
    };
*/

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
        "id": projects[k].ID,
        "name": projects[k].name,
        "desc": projects[k].description,
        "url": projects[k].website_url,
        "mail": projects[k].contact_email,
        "orgs": projects[k].organisations,
        "areas": projects[k].countries

      }
    };
    geojson_projects['features'].push(newFeature);  
    };
    
  };
  return geojson_projects;
}



var unfairtobacco;
var projekte_geojson;

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  
  projekte_geojson = render_to_geojson(unfairtobacco.projects);
  //console.log(projekte_geojson);

  var Layer_project = L.geoJson(projekte_geojson, {
      onEachFeature: OnEachFeature
  }).addTo(map);

});




var countries;

$.getJSON( "country_layer.json", function( data ) {
  
  countries = data;
  
  //projekte_geojson = render_to_geojson(unfairtobacco.projects);
  //console.log(projekte_geojson);
  /*
  var Layer_project = L.geoJson(projekte_geojson, {
      onEachFeature: OnEachFeature
  }).addTo(map);
  */
  countries.addTo(map);

});

