var map = L.map('map').setView( new L.LatLng(20, 10), 2);
var toner = new L.StamenTileLayer("toner");
map.addLayer(toner);

var baseLayers = {
  "Toner": toner
};

// ########## //
// get data


//var unfairtobacco =

$.getJSON( "data.json", function( data ) {
  //console.log(data)
  unfairtobacco = data;
  //var unfairtobacco = data;
  //return obj;
}
);


/*
var unfairtobacco = getJson();

function getJson(){
    var result =
    $.getJSON( "data.json", function( data ){

        result = data;
    });
    return result;
};
*/

//var projects = new Object();

//var projects = unfairtobacco["projects"];

//var json = JSON.parse(unfairtobacco);

//projects.ID = unfairtobacco.projects.ID

// ########## //
// GeoJSON für Projekte aus unfairtobacco (Struktur siehe Beispiel)
/*
var geojson_projects = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];


for (var k in projects) {
  var newFeature = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": parseFloat(projects[k].coordinates[0]), parseFloat(projects[k].coordinates[1])]
    },
    "properties": {
      "title": projects[k].name,
      "description": projects[k].description
    }
  }
  geojson['features'].push(newFeature);
};
*/
        // Beispiel manuell
        var geojson_projects = 

        {
         	"type": "FeatureCollection",
         	"features": 
        	[
        		{
            			"type": "Feature",
            			"properties": 
        				{
        				"name":"Tobacco to Bamboo",
        				"description":"BlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtextBlindtext",
        				"website_url":"www.tobaccotobamboo.org",
        				"contact_email":"tobaccotobamboo@gmail.com",
        				"iso_code":"KE",
            		},
            			"geometry": 
        				{
                			"type": "Point",
                			"coordinates": [37.99521440000001, -1.3750813]
            				}
           		},
            	]
            };


// ########## //
// LAYER Projekte

var Layer_project = L.geoJson(geojson_projects, {
    onEachFeature: OnEachFeatureFunction
}).addTo(map);

// MIT IF ELSE

//if (Layer_project)


// event hover
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

/*
// event click on
function OnEachFeatureFunction(feature, marker){
    if (feature.properties.description) {
        marker.bindPopup('<b>' + feature.properties.name + '</b>' + '<br>' +
                        feature.properties.description + '<br>' +
                        'Website: ' + feature.properties.website_url + '<br>' +
                        'Contact: ' + feature.properties.contact_email
                        );
        }
    };
*/