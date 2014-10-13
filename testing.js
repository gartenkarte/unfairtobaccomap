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

function createModal(geojson) {
  var modal = document.createElement("div");
  var modal_url = geojson.properties.name.replace(/ /g,"-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
  modal.id = modal_url;
  modal.className = "modal fade";
  modal.innerHTML = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a href="#"><button>&times;</button></a><h2 class="modal-title">'+ geojson.properties.name +'</h2></div><div class="modal-body"><p>'+ geojson.properties.desc +'</p><p>'+geojson.properties.mail+'</p><p>'+geojson.properties.url+'</p></div></div></div>';
  document.body.appendChild(modal);
}

function renderPopup(feature, url) {
  partial_head = '<h2>'
  if (feature.properties.url != '') {
    link_start = '<a href="'+ feature.properties.url +'">';
    link_end = '</a>'
  }
  else {
    link_start = '';
    link_end = '';
  }
  partial_foot = '</h2><br><a href="#'+ url +'">Read more</a>';
  return partial_head + link_start + feature.properties.name + link_end + partial_foot;
}

function OnEachFeature(feature, layer){
  if (feature.properties && feature.properties.name) {
      var url = feature.properties.name.replace(/ /g,"-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
      createModal(feature);

      /* http://lea.verou.me/2011/05/change-url-hash-without-page-jump/ */
      layer.on('click', function () {

            location.hash = '#' + url;

      });
  }
};



function condenseLocations ( element ) {
  var callback = [];
  callback[0] = unfairtobacco.locations[element].longitude;
  callback[1] = unfairtobacco.locations[element].latitude;
  return callback;
}

function replaceLocations ( element ) {
  var copy = $.extend(true, {}, element, copy);
  copy.locations = $.map(element.locations, condenseLocations);
  return copy;
}

function renderLayer ( projects ) {
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
        "coordinates": replaceLocations(obj).locations
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
  return L.geoJson(geojson_projects, {
      onEachFeature: OnEachFeature
  });
}



var unfairtobacco;
var projekte_geojson;

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;

  renderLayer(data.projects).addTo(map);

  renderGeometry(data.countries);

});




///////////////// hinzufügen der Länder-GEOJSONs


function displayCountries(unfair) {
  return function (geojson) {
    enrichGeometry(geojson, unfair).addTo(map);
  };
}

function enrichGeometry(geojson, unfair) {

  var merge = $.extend(true, {}, geojson.features[0].properties, unfair)

  return L.geoJson(geojson, {
    style: style,
    //TODO onEachFeature: OnEachCountryFeature
  });

};

// get geoJSON anhand des ISO-Array
function renderGeometry ( countries ) {

    for (var k in countries) {
      var obj = countries[k];
      if (obj.iso_code != null) {

        // http://stackoverflow.com/questions/6129145/pass-extra-parameter-to-jquery-getjson-success-callback-function
        $.getJSON("countries/" + obj.iso_code.toLowerCase() + ".geojson", displayCountries(obj));
      }
    };  
}


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