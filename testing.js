if(L.Browser.retina) var tp = "lr";
    else var tp = "ls";
var lyrk = L.tileLayer('http://tiles.lyrk.org/'+tp+'/{z}/{x}/{y}?apikey=701dcc16672d4781b03ca506db3ef046', {
    attribution: '<a href="http://geodienste.lyrk.de/copyright">Lizenzinformationen</a>, Tiles by <a href="http://geodienste.lyrk.de/">Lyrk</a>',
    maxZoom: 18
});

var map = L.map('map', {
  layers: [lyrk]
}).setView( new L.LatLng(20, 10), 2);



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

/*      layer.bindPopup(renderPopup(feature, url)
                      ); */
/*      layer.on('mouseover', function () {
          this.openPopup();
                      });
      layer.on('mouseout', function () {
          this.closePopup();
                      });
*/

/* http://lea.verou.me/2011/05/change-url-hash-without-page-jump/ */
      layer.on('click', function () {
          /* this.openPopup(); */
/*        if(history.pushState) {
            history.pushState(null, null, '#' + url);
        }
        else { */
            location.hash = '#' + url;
        /*}*/
      });
  }
};



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




