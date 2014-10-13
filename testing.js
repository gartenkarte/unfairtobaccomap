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
  console.log(projekte_geojson);

  var Layer_project = L.geoJson(projekte_geojson, {
      onEachFeature: OnEachFeature
  }).addTo(map);

});




///////////////// hinzufügen der Länder-GEOJSONs



// erstellt Array mit ISO-Daten der verwiesenen Länder
function iso_render_to_array ( countries ) {
    var countries_ISO = [];

    for (var k in countries) {
      var obj = countries[k];
      if (obj.iso_code != null) {
        countries_ISO.push(countries[k].iso_code.toLowerCase());
      };
    };
  return countries_ISO;
}


/*
function merge_countries_geojson ( country ) {
  var mergedJSON = {};
  mergedJSON['type'] = 'FeatureCollection';
  mergedJSON['features'] = [];

  for (var k in country) {
    var obj = country[k];
    //if (obj.properties.ISO2 != null) {
      var newFeature = {
        "type": "Feature",
        "properties": {
          "ISO2": country[k].ISO2,
          "Name": country[k].NAME,
          "LON": country[k].LON,
          "LAT": country[k].LAT
        },
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": country[k].coordinates
        }
      };
      mergedJSON['features'].push(newFeature);  
   // };
  };
  return mergedJSON;
}
*/

// get geoJSON anhand des ISO-Array
function get_And_Merge_Countries_to_geoJSON ( array ) {
    var countriesMerged = {};
    var country = {};

    for (i = 0; i <= array.length; ++i) {
      $.getJSON("countries/" + array[i] + ".geojson", function( data ) {

        country = data;
        //console.log(country);

        //countriesMerged = merge_countries_geojson(country);    
     // };
     var Layer_countries = L.geoJson(country, {
      style: style,
      //onEachFeature: onEachFeature
      }).addTo(map);

      });
    };  
  //return country;
}


var unfairtobaccoCountries;
var arrayCountries;
var geoJsonCountries = {};

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  
  arrayCountriesISO = iso_render_to_array(unfairtobacco.countries);
  //console.log(arrayCountriesISO);

  geoJsonCountries = get_And_Merge_Countries_to_geoJSON(arrayCountriesISO);
  //console.log(geoJsonCountries);

  //var Layer_countries = L.geoJson(geoJsonCountries, {
  //    onEachFeature: OnEachFeature
  //}).addTo(map);

});



/////////// Länder hervorhoben

function style(feature) {
    return {
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}


