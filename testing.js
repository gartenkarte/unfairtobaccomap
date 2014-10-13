if(L.Browser.retina) var tp = "lr";
    else var tp = "ls";
var lyrk = L.tileLayer('http://tiles.lyrk.org/'+tp+'/{z}/{x}/{y}?apikey=701dcc16672d4781b03ca506db3ef046', {
    attribution: '<a href="http://geodienste.lyrk.de/copyright">Lizenzinformationen</a>, Tiles by <a href="http://geodienste.lyrk.de/">Lyrk</a>',
    maxZoom: 18
});

var map = L.map('map', {
  layers: [lyrk]
}).setView( new L.LatLng(20, 10), 2);

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


var countries_ISO = [];
var countries_meta = [];

// erstellt Array mit ISO-Daten der verwiesenen Länder
function iso_render_to_array ( countries ) {


    for (var k in countries) {
      var obj = countries[k];
      if (obj.iso_code != null) {
        countries_ISO.push(countries[k]);
      };
    };
  return countries_ISO;
}


function CreateCountryCallback(unfair) {
  return function (geojson) {
    merge_unfair_countries(geojson, unfair);
  };
}

function merge_unfair_countries(geojson, unfair) {

  var merge = $.extend(true, {}, geojson.features[0].properties, unfair)
  console.log(merge);

  var Layer_countries = L.geoJson(geojson, {
    style: style,
    //TODO onEachFeature: OnEachCountryFeature
  }).addTo(map);

};

// get geoJSON anhand des ISO-Array
function get_And_Merge_Countries_to_geoJSON ( array ) {
    var countriesMerged = {};
    var country = {};

    for (i = 0; i <= array.length; ++i) {
      if ( array[i] != null) {
        // http://stackoverflow.com/questions/6129145/pass-extra-parameter-to-jquery-getjson-success-callback-function
        $.getJSON("countries/" + array[i].iso_code.toLowerCase() + ".geojson", CreateCountryCallback(array[i]));
      }
    };  
}


var unfairtobaccoCountries;
var arrayCountries;
var geoJsonCountries = {};

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;
  
  arrayCountriesISO = iso_render_to_array(unfairtobacco.countries);

  get_And_Merge_Countries_to_geoJSON(arrayCountriesISO);

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