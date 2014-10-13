if(L.Browser.retina) var tp = "lr";
    else var tp = "ls";
var lyrk = L.tileLayer('http://tiles.lyrk.org/'+tp+'/{z}/{x}/{y}?apikey=701dcc16672d4781b03ca506db3ef046', {
    attribution: '<a href="http://geodienste.lyrk.de/copyright">Lizenzinformationen</a>, Tiles by <a href="http://geodienste.lyrk.de/">Lyrk</a>',
    maxZoom: 18
});

var map = L.map('map', {
  layers: [lyrk],
  center: [20, 10],
  zoom: 2,
  minZoom: 2,
  maxZoom: 18,
  zoomControl: false
});

map.addControl(new L.Control.ZoomMin());



// POPUPS

function createModal(props) {
  var modal = document.createElement("div");
  var modal_url = props.name.replace(/ /g,"-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
  
  partial_title = '<h2 class="modal-title">'+ props.name +'</h2></div>';

  modal.id = modal_url;
  modal.className = "modal fade";
  modal.innerHTML = '<div class="modal-dialog">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<a href="#"><button>&times;</button></a>'
    + ( ( props.url != '') ?
      '<a href="'+ props.url+'">' + partial_title + '</a></p>' : 
      partial_title)
    + '<div class="modal-body">'
    + ( ( props.orgs != []) ? renderOrganizations(props.orgs) : '')
    + ( ( props.desc != '') ? '<p>'+ props.desc +'</p>' : '')
    + ( ( props.mail != '') ? '<p>'+ props.mail +'</p>' : '')
    + '</div></div></div>';
  document.body.appendChild(modal);
}

function renderOrganization ( org ) {
  callback = ' '
  + ( ( org.website_url != '' ) ?
    '<a href="' + org.website_url + '">' + org.name + '</a>' :
    org.name)
  + ( ( org.abbreviation != '' ) ? 
    ' (' + org.abbreviation + ')': 
    '');

  return callback;
}

function renderOrganizations ( orgs ) {
  arr = [];
  
  switch (orgs.length) {
    case 0:
        partial = '';
        break; 
    case 1:
        partial = '<em><strong>Organization:</em></strong>';
        break; 
    default: 
        partial = '<em><strong>Organizations:</em></strong>';
  }
  
  for (i = 0; i <= orgs.length; ++i) {
    if ( orgs[i] != null) {
      arr.push(renderOrganization(orgs[i]));
    }
  };
  return partial + arr.join();
}

function onEachProjectFeature(feature, layer){
  if (feature.properties && feature.properties.name) {
      var url = feature.properties.name.replace(/ /g,"-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
      createModal(feature.properties);

      layer.bindPopup('<h3>' + feature.properties.name + '</h3>');

      layer.on('mouseover', function () {
          this.openPopup();
      });
      layer.on('mouseout', function () {
          this.closePopup();
      });

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

function condenseOrganizations ( e ) {
  return unfairtobacco.organisations[e];
}

function replaceOrganizations ( e ) {
  var copy = $.extend(true, {}, e, copy);
  copy.organisations = $.map(e.organisations, condenseOrganizations);
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
        "id": obj.ID,
        "name": obj.name,
        "desc": obj.description,
        "url": obj.website_url,
        "mail": obj.contact_email,
        "orgs": replaceOrganizations(obj).organisations,
        "areas": obj.countries

      }
    };
    geojson_projects['features'].push(newFeature);  
    };
    
  };
  console.log(geojson_projects);
  return geojson_projects;
}

var unfairtobacco;
var projekte_geojson;

$.getJSON( "data.json", function( data ) {
  
  unfairtobacco = data;

  projectJSON = renderLayer(data.projects);

  projectLayer = L.geoJson(projectJSON, {
      onEachFeature: onEachProjectFeature
  });

  projectLayer.addTo(map);

  renderGeometry(data.countries);

});













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
    //info_project.update(layer.feature.properties);
    
    }
}

// Mouseout
function resetHighlight(e) {
    CountryLayer.resetStyle(e.target);
    info.update();
//    info_project.update();
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




//%%%%% INFOKASTEN %%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%////////////////


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    console.log(props);
    this._div.innerHTML = '<h4>Alternatives to Tobacco</h4>' +  
        (props ?
        '<b>' + props.name + '</b><p>'    
                                          + 'Gini Coefficient: ' + props.gini_coefficient + '<br>' 
                                          + 'Global Hunger Index: ' + props.global_hunger_index + '<br>'
                                          + 'Cigarette Consumption per capita: ' + props.cigarette_consumption_per_capita + '<br>'
                                          + 'Land devoted to growing tobacco: ' + props.land_devoted_to_tobacco + '<br>'
                                          + 'sources: ' + props.sources + '</p>'
        : '<i>Hint:</i> Move Mouse over a coloured area,<br />click the icons.');
};

info.addTo(map);





///////////////// hinzufügen der Länder-GEOJSONs

var CountryLayer;
function displayCountries(unfair) {
  return function (geojson) {
    var merge = $.extend(true, {}, geojson.features[0].properties, unfair);
    var copy = $.extend(true, {}, geojson);
    copy.features[0].properties = merge;
    CountryLayer = L.geoJson(copy, {
      style: style,
      onEachFeature: onEachCountryFeature
    })
    CountryLayer.addTo(map);
  };
}



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