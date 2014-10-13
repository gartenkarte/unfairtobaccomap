var map = L.map('map').setView( new L.LatLng(20, 10), 2);
var toner = new L.StamenTileLayer("toner");
map.addLayer(toner);


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


/*
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
*/



///////////////// hinzufügen und mergen der Länder-GEOJSONs




function iso_render_to_array ( countries ) {
    var countries_ISO = [];

    for (var k in countries) {
      var obj = countries[k];
      // Crude hack to exclude missing Simbabwe.
      if ( ( obj.iso_code != null ) && ( obj.iso_code != 'ZW' ) )
        countries_ISO.push(obj.iso_code.toLowerCase());
    }
  return countries_ISO;
};


function merge_countries_geojson (country) {
  var mergedJSON = {};
  mergedJSON['type'] = 'FeatureCollection';
  mergedJSON['features'] = [];

  for (var k in country) {
    var obj = country[k];
    if (obj.properties.ISO2 != null) {
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
    };
  };
  return mergedJSON;
}


function get_And_Merge_Countries_to_geoJSON ( array ) {

  var countriesMerged = {};
  countriesMerged['type'] = 'FeatureCollection';
  countriesMerged['features'] = [];

  for (i = 0; i <= array.length; ++i) {
    if (array[i] != null) {
      $.getJSON( "iso_nations/" + array[i] + ".geojson", function( data ) {
        //country = data;
        //countriesMerged.push(merge_countries_geojson(country));
        //countriesMerged.push(array[i]);
        //console.log(data);
        countriesMerged['features'].push(data.features['0']);




      });

    }

  };
  return countriesMerged;

};
  





//var unfairtobaccoCountries;
var arrayCountriesISO;
var geoJsonCountries;

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  
  arrayCountriesISO = iso_render_to_array(unfairtobacco.countries);

  geoJsonCountries = get_And_Merge_Countries_to_geoJSON(arrayCountriesISO);

/* layer = new L.GeoJSON( null,
    { onEachFeature: function(feature,layer)
        {
            layer.bindPopup(feature.properties.NAME);
        }
    }).addTo(map);


    for(var i=0; i<geoJsonCountries.features.length; i++)
    {
        layer.addData(geoJsonCountries.features[i]);
    }
*/

var Layer_countries = L.geoJson(geoJsonCountries, {
    style: style,
    onEachFeature: onEachCountryFeature
}).addTo(map);

console.log(Layer_countries);

var unfairLayers = {
  "Countries": Layer_countries
}

var baseLayers = {
  "Toner": toner
};

L.control.layers(baseLayers, unfairLayers).addTo(map);



});




/*
  var countries;

$.getJSON( "de.geojson", function( data ) {
  
  countries = data;
  
  var Layer_countries = L.geoJson(countries, {
      onEachFeature: OnEachFeature
  }).addTo(map);
  

});
*/



// Style fürs Highlighting -> Mouseover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    
    info.update(layer.feature.properties);
    info_project.update(layer.feature.properties);
    
    }
}

// Mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
    info_project.update();
}

// Zoom
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// add the functions to the layer
function onEachCountryFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        fillColor: 'red',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
}



