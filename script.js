// Code goes here

var map = L.map('map').setView( new L.LatLng(20, 10), 2);

var layer = new L.StamenTileLayer("toner");
map.addLayer(layer);


//%%%% Projektdaten abfragen und aufbereiten %%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

// ???
// ???


var json = {"projects":{"5784":{"ID":"5784","name":"Tobacco to Bamboo","description":"","website_url":"www.tobaccotobamboo.org","contact_email":"tobaccotobamboo@gmail.com","organisations":[],"countries":[5786],"locations":[5788]},"5790":{"ID":"5790","name":"National Programme for Diversification in Tobacco Growing Areas","description":"","website_url":"http:\/\/comunidades.mda.gov.br\/portal\/saf\/programas\/projetosespeciais\/2308129","contact_email":"","organisations":[5792],"countries":[5791],"locations":[]},"5806":{"ID":"5806","name":"WBB Trust Seminar on Alternative Livelihoods","description":"","website_url":"","contact_email":"","organisations":[5805],"countries":[5808],"locations":[]},"5816":{"ID":"5816","name":"Advisory Service on Alternative Livelihoods","description":"","website_url":"http:\/\/www.ubinig.org\/index.php\/home\/getArticlesUnderCat\/9\/english","contact_email":"info@ubinig.org","organisations":[5810,5811],"countries":[5808],"locations":[]},"5823":{"ID":"5823","name":"Lobbying for Alternative Livelihoods for Bidi Workers","description":"","website_url":"","contact_email":"http:\/\/www.bata.net.bd\/contactus.php?mid=9","organisations":[5804],"countries":[5808],"locations":[5818]},"5824":{"ID":"5824","name":"Oregano Project","description":"","website_url":"","contact_email":"","organisations":[5815],"countries":[5809],"locations":[5821]},"5827":{"ID":"5827","name":"Herbs as Alternative","description":"","website_url":"","contact_email":"info@metzkraeuter.de","organisations":[5826],"countries":[5783],"locations":[5825]},"5830":{"ID":"5830","name":"Technical Support and Training for Smallholder Farmers","description":"","website_url":"","contact_email":"cepagro@cepagro.org.br","organisations":[5812],"countries":[5791],"locations":[5820]}},"countries":{"5786":{"ID":5786,"name":"Kenya","iso_code":"KE","gini_coefficient":"47.7","global_hunger_index":"18","land_devoted_to_tobacco":"144","cigarette_consumption_per_capita":"21","sources":"","region":"Africa"},"5791":{"ID":5791,"name":"Brazil","iso_code":"BR","gini_coefficient":"54.7","global_hunger_index":"< 5","land_devoted_to_tobacco":"144","cigarette_consumption_per_capita":"20,642","sources":"","region":"Latin America"},"5808":{"ID":5808,"name":"Bangladesh","iso_code":"BD","gini_coefficient":"32.1","global_hunger_index":"19.4","land_devoted_to_tobacco":"29,869","cigarette_consumption_per_capita":"154","sources":"","region":"Asia"},"5809":{"ID":5809,"name":"Lebanon","iso_code":"LB","gini_coefficient":"n\/a","global_hunger_index":"< 5","land_devoted_to_tobacco":"8,217","cigarette_consumption_per_capita":"2,138","sources":"","region":"North Africa\/Middle East"},"5783":{"ID":5783,"name":"Germany","iso_code":"DE","gini_coefficient":"31.0","global_hunger_index":"N\/A","land_devoted_to_tobacco":"1","cigarette_consumption_per_capita":"3","sources":"","region":"Europe\/USA"}},"locations":{"5788":{"ID":5788,"name":"Kitui\/Kenya","latitude":"-1.3750813","longitude":"37.99521440000001"},"5818":{"ID":5818,"name":"Dhaka","latitude":"23.810332","longitude":"90.41251809999994"},"5821":{"ID":5821,"name":"Beirut","latitude":"33.8886289","longitude":"35.49547940000002"},"5825":{"ID":5825,"name":"Herxheim-Hayna","latitude":"49.122961","longitude":"8.204054000000042"},"5820":{"ID":5820,"name":"Florianopolis","latitude":"-27.5949884","longitude":"-48.54817430000003"}},"organisations":{"5792":{"ID":5792,"name":"Ministry of Agrarian Development","abbreviation":"MDA","website_url":"www.mda.gov.br"},"5805":{"ID":5805,"name":"Work for a Better Bangladesh","abbreviation":"WBB Trust","website_url":"http:\/\/www.wbbtrust.org\/"},"5810":{"ID":5810,"name":"Policy Research for Development Alternatives","abbreviation":"UBINIG","website_url":"http:\/\/ubinig.org\/"},"5811":{"ID":5811,"name":"Nayakrishi Andolon","abbreviation":"","website_url":"http:\/\/www.ubinig.org\/index.php\/network\/userNayakrishi\/english"},"5804":{"ID":5804,"name":"Bangladesh Anti Tobacco Alliance","abbreviation":"BATA","website_url":"http:\/\/www.bata.net.bd\/information.php?mid=1&smid=1"},"5815":{"ID":5815,"name":"International Labour Organisation","abbreviation":"ILO","website_url":"http:\/\/www.ilo.org"},"5826":{"ID":5826,"name":"Metz Herbs","abbreviation":"","website_url":"http:\/\/metzkraeuter.de\/"},"5812":{"ID":5812,"name":"Study and Promotion Center of Group Agriculture","abbreviation":"CEPAGRO","website_url":"http:\/\/cepagroagroecologia.wordpress.com\/"}}}
;

// ???
// ???

//%%%%% DATEN für Länderhighlighting und Infokasten | COUNTRYLAYER %%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//


var countries = {
 	"type": "FeatureCollection",
 	"features": 
	[
		{
    			"type": "Feature",
    			"properties": 
				{
				  "name_country":"Kenya", 
          "iso_code":"KE", 
          "gini_coefficient":"47.7", 
          "global_hunger_index":"18", 
          "land_devoted_to_tobacco":"144", 
          "cigarette_consumption_per_capita":"21", 
          "sources":"",
    		},
    			"geometry": 
    			  { 
    			  "type": "MultiPolygon", 
    			  "coordinates": [ [ [ [ 41.138054000000153, -2.12444 ], [ 40.950272, -2.17361 ], [ 41.063889000000103, -2.044167 ], [ 41.138054000000153, -2.12444 ] ] ], [ [ [ 35.940552, 4.622499 ], [ 37.039719, 4.375555000000134 ], [ 38.121109, 3.611666 ], [ 39.524437, 3.406389 ], [ 40.783768, 4.287975 ], [ 41.171387, 3.9425 ], [ 41.90517, 3.98032 ], [ 40.986595000000108, 2.829956 ], [ 40.998329, -0.866111 ], [ 41.558159, -1.67487 ], [ 41.315277000000179, -1.95806 ], [ 40.891663, -2.01917 ], [ 40.963608000000107, -2.29889 ], [ 40.854996000000114, -2.236111 ], [ 40.63805, -2.55 ], [ 40.236664000000104, -2.663333 ], [ 39.203026000000108, -4.66962 ], [ 37.613609, -3.50417 ], [ 37.602776, -2.995833 ], [ 33.920273, -1.00111 ], [ 33.907219, 0.103056 ], [ 35.009720000000101, 1.895278 ], [ 34.463333, 3.671389 ], [ 33.996666, 4.222777000000136 ], [ 34.388191, 4.609682 ], [ 35.940552, 4.622499 ] ] ] ]
   		      },
		},
				{
    			"type": "Feature",
    			"properties": 
				{
				  "name_country":"Brazil", 
          "iso_code":"BR", 
          "gini_coefficient":"54.7", 
          "global_hunger_index":"< 5", 
          "land_devoted_to_tobacco":"144", 
          "cigarette_consumption_per_capita":"20,642", 
          "sources":"",
          "name_project": "National Programme for Diversification in Tobacco Growing Areas",
          "description": "",
          "website_url_project": "http:\/\/comunidades.mda.gov.br\/portal\/saf\/programas\/projetosespeciais\/2308129",
          "contact_email": "",
          "name_organisation": "Ministry of Agrarian Development",
          "abbreviation": "MDA",
          "website_url_organisation": "www.mda.gov.br",
    		},
    			"geometry": 
    			  { 
    			  "type": "MultiPolygon", 
    			  "coordinates": [ [ [ [ -48.550559997558594, -27.821392059326172 ], [ -48.517227172851562, -27.430835723876953 ], [ -48.4183349609375, -27.388889312744141 ], [ -48.550559997558594, -27.821392059326172 ] ] ], [ [ [ -48.58111572265625, -26.391670227050781 ], [ -48.707778930664062, -26.309722900390625 ], [ -48.53778076171875, -26.167224884033203 ], [ -48.58111572265625, -26.391670227050781 ] ] ], [ [ [ -48.282501220703125, -25.486114501953125 ], [ -48.333061218261719, -25.413059234619141 ], [ -48.256668090820312, -25.338890075683594 ], [ -48.282501220703125, -25.486114501953125 ] ] ], [ [ [ -47.877784729003906, -25.026947021484375 ], [ -47.816673278808594, -24.900001525878906 ], [ -47.606674194335938, -24.783611297607422 ], [ -47.877784729003906, -25.026947021484375 ] ] ], [ [ [ -46.282783508300781, -23.989170074462891 ], [ -46.416389465332031, -23.950279235839844 ], [ -46.323616027832031, -23.930000305175781 ], [ -46.282783508300781, -23.989170074462891 ] ] ], [ [ [ -45.126396179199219, -23.821392059326172 ], [ -45.136390686035156, -23.797779083251953 ], [ -45.105003356933594, -23.806392669677734 ], [ -45.126396179199219, -23.821392059326172 ] ] ], [ [ [ -45.220840454101562, -23.779445648193359 ], [ -45.218338012695312, -23.955833435058594 ], [ -45.441390991210938, -23.928890228271484 ], [ -45.220840454101562, -23.779445648193359 ] ] ], [ [ [ -44.088890075683594, -23.174446105957031 ], [ -44.369171142578125, -23.172225952148438 ], [ -44.228614807128906, -23.071113586425781 ], [ -44.088890075683594, -23.174446105957031 ] ] ], [ [ [ -29.840000152587891, -20.496391296386719 ], [ -29.848892211914062, -20.500835418701172 ], [ -29.852222442626953, -20.491111755371094 ], [ -29.840000152587891, -20.496391296386719 ] ] ], [ [ [ -30.295280456542969, -20.505834579467773 ], [ -30.319446563720703, -20.520000457763672 ], [ -30.334165573120117, -20.482223510742188 ], [ -30.295280456542969, -20.505834579467773 ] ] ], [ [ [ -38.911666870117188, -13.67527961730957 ], [ -38.991950988769531, -13.593055725097656 ], [ -38.91278076171875, -13.587501525878906 ], [ -38.911666870117188, -13.67527961730957 ] ] ], [ [ [ -38.93695068359375, -13.5625 ], [ -38.984451293945312, -13.5625 ], [ -38.964443206787109, -13.498844146728516 ], [ -39.041114807128906, -13.462223052978516 ], [ -39.038612365722656, -13.39777946472168 ], [ -38.908058166503906, -13.385557174682617 ], [ -38.93695068359375, -13.5625 ] ] ], [ [ [ -38.754722595214844, -13.113056182861328 ], [ -38.643333435058594, -12.892223358154297 ], [ -38.591667175292969, -12.98750114440918 ], [ -38.754722595214844, -13.113056182861328 ] ] ], [ [ [ -37.13250732421875, -11.129446029663086 ], [ -37.146392822265625, -11.108612060546875 ], [ -37.036949157714844, -10.95250129699707 ], [ -37.13250732421875, -11.129446029663086 ] ] ], [ [ [ -34.873893737792969, -7.073333740234375 ], [ -34.888893127441406, -7.071945190429688 ], [ -34.866668701171875, -7.048610687255859 ], [ -34.873893737792969, -7.073333740234375 ] ] ], [ [ [ -34.854171752929688, -7.005277633666992 ], [ -34.863059997558594, -7.013889312744141 ], [ -34.859725952148438, -6.994443893432617 ], [ -34.854171752929688, -7.005277633666992 ] ] ], [ [ [ -32.450836181640625, -3.883609771728516 ], [ -32.424171447753906, -3.845832824707031 ], [ -32.386672973632812, -3.840276718139648 ], [ -32.450836181640625, -3.883609771728516 ] ] ], [ [ [ -44.610282897949219, -3.008054733276367 ], [ -44.656112670898438, -2.973609924316406 ], [ -44.611671447753906, -2.887222290039062 ], [ -44.610282897949219, -3.008054733276367 ] ] ], [ [ [ -44.586395263671875, -3.052499771118164 ], [ -44.577507019042969, -2.801944732666016 ], [ -44.483894348144531, -2.709999084472656 ], [ -44.586395263671875, -3.052499771118164 ] ] ], [ [ [ -42.050834655761719, -2.761667251586914 ], [ -42.1844482421875, -2.677499771118164 ], [ -42.069450378417969, -2.685832977294922 ], [ -42.050834655761719, -2.761667251586914 ] ] ], [ [ [ -43.693334579467773, -2.326944351196289 ], [ -43.739173889160156, -2.350276947021484 ], [ -43.615280151367188, -2.26249885559082 ], [ -43.693334579467773, -2.326944351196289 ] ] ], [ [ [ -50.8638916015625, -1.910833358764648 ], [ -50.988059997558594, -1.993610382080078 ], [ -51.148338317871094, -1.828611373901367 ], [ -50.8638916015625, -1.910833358764648 ] ] ], [ [ [ -49.024169921875, -1.829166412353516 ], [ -49.156951904296875, -1.858055114746094 ], [ -49.055557250976562, -1.721111297607422 ], [ -49.024169921875, -1.829166412353516 ] ] ], [ [ [ -48.961112976074219, -1.795831680297852 ], [ -49.046112060546875, -1.705278396606445 ], [ -48.902778625488281, -1.577220916748047 ], [ -48.961112976074219, -1.795831680297852 ] ] ], [ [ [ -44.652778625488281, -1.62388801574707 ], [ -44.662223815917969, -1.661945343017578 ], [ -44.778892517089844, -1.668054580688477 ], [ -44.783340454101562, -1.619167327880859 ], [ -44.713058471679688, -1.561111450195312 ], [ -44.652778625488281, -1.62388801574707 ] ] ], [ [ [ -52.024726867675781, -1.580278396606445 ], [ -52.200836181640625, -1.646665573120117 ], [ -52.029449462890625, -1.439722061157227 ], [ -51.914451599121094, -1.516387939453125 ], [ -52.024726867675781, -1.580278396606445 ] ] ], [ [ [ -52.4183349609375, -1.527500152587891 ], [ -52.431114196777344, -1.466388702392578 ], [ -52.168617248535156, -1.408332824707031 ], [ -52.4183349609375, -1.527500152587891 ] ] ], [ [ [ -48.633613586425781, -1.484722137451172 ], [ -48.696670532226562, -1.449167251586914 ], [ -48.657501220703125, -1.375833511352539 ], [ -48.633613586425781, -1.484722137451172 ] ] ], [ [ [ -48.525840759277344, -1.524999618530273 ], [ -48.592506408691406, -1.442220687866211 ], [ -48.553337097167969, -1.366109848022461 ], [ -48.525840759277344, -1.524999618530273 ] ] ], [ [ [ -44.987503051757812, -1.401945114135742 ], [ -44.975563049316406, -1.261667251586914 ], [ -44.881111145019531, -1.283056259155273 ], [ -44.987503051757812, -1.401945114135742 ] ] ], [ [ [ -45.634170532226562, -1.34638786315918 ], [ -45.689443588256836, -1.360832214355469 ], [ -45.626943588256836, -1.126943588256836 ], [ -45.634170532226562, -1.34638786315918 ] ] ], [ [ [ -48.340278625488281, -1.212778091430664 ], [ -48.465560913085938, -1.162776947021484 ], [ -48.412223815917969, -1.07499885559082 ], [ -48.322502136230469, -1.076944351196289 ], [ -48.340278625488281, -1.212778091430664 ] ] ], [ [ [ -46.498893737792969, -1.02027702331543 ], [ -46.533340454101562, -1.017499923706055 ], [ -46.54833984375, -0.972221374511719 ], [ -46.456672668457031, -0.88861083984375 ], [ -46.44000244140625, -1.006387710571289 ], [ -46.498893737792969, -1.02027702331543 ] ] ], [ [ [ -50.987228393554688, -0.866388320922852 ], [ -50.92083740234375, -0.869722366333008 ], [ -51.012619018554688, -0.919502258300781 ], [ -51.019447326660156, -0.991666793823242 ], [ -51.070037841796875, -1.03779411315918 ], [ -51.182502746582031, -1.091667175292969 ], [ -50.987228393554688, -0.866388320922852 ] ] ], [ [ [ -51.375282287597656, -1.21360969543457 ], [ -51.400283813476562, -1.201944351196289 ], [ -51.363616943359375, -1.129444122314453 ], [ -51.248893737792969, -1.024721145629883 ], [ -51.203056335449219, -0.841667175292969 ], [ -51.239448547363281, -1.143888473510742 ], [ -51.375282287597656, -1.21360969543457 ] ] ], [ [ [ -50.920280456542969, -0.844999313354492 ], [ -50.922782897949219, -0.729166030883789 ], [ -50.842781066894531, -0.727777481079102 ], [ -50.920280456542969, -0.844999313354492 ] ] ], [ [ [ -47.935005187988281, -0.727222442626953 ], [ -47.951667785644531, -0.731945037841797 ], [ -47.970840454101562, -0.680000305175781 ], [ -47.932502746582031, -0.636667251586914 ], [ -47.876113891601562, -0.673055648803711 ], [ -47.935005187988281, -0.727222442626953 ] ] ], [ [ [ -47.668060302734375, -0.709165573120117 ], [ -47.696670532226562, -0.7147216796875 ], [ -47.718894958496094, -0.640556335449219 ], [ -47.665283203125, -0.573610305786133 ], [ -47.637222290039062, -0.620832443237305 ], [ -47.668060302734375, -0.709165573120117 ] ] ], [ [ [ -51.131950378417969, -0.959444046020508 ], [ -51.070281982421875, -0.69444465637207 ], [ -50.815834045410156, -0.572221755981445 ], [ -51.131950378417969, -0.959444046020508 ] ] ], [ [ [ -51.051116943359375, -0.65916633605957 ], [ -51.098335266113281, -0.633888244628906 ], [ -51.025283813476562, -0.560556411743164 ], [ -51.051116943359375, -0.65916633605957 ] ] ], [ [ [ -51.901390075683594, -1.476667404174805 ], [ -51.952224731445312, -1.430831909179688 ], [ -51.885002136230469, -1.178888320922852 ], [ -51.662223815917969, -1.083332061767578 ], [ -51.609725952148438, -0.733888626098633 ], [ -51.381950378417969, -0.541389465332031 ], [ -51.199722290039062, -0.529167175292969 ], [ -51.148338317871094, -0.669721603393555 ], [ -51.271665573120117, -1.014165878295898 ], [ -51.48333740234375, -1.240278244018555 ], [ -51.901390075683594, -1.476667404174805 ] ] ], [ [ [ -51.403335571289062, -0.54083251953125 ], [ -51.411392211914062, -0.499721527099609 ], [ -51.239448547363281, -0.454442977905273 ], [ -51.403335571289062, -0.54083251953125 ] ] ], [ [ [ -50.9586181640625, -0.567499160766602 ], [ -50.878334045410156, -0.385276794433594 ], [ -50.776947021484375, -0.383888244628906 ], [ -50.9586181640625, -0.567499160766602 ] ] ], [ [ [ -51.107780456542969, -0.539999008178711 ], [ -51.03472900390625, -0.283056259155273 ], [ -50.946670532226562, -0.353889465332031 ], [ -51.107780456542969, -0.539999008178711 ] ] ], [ [ [ -50.9072265625, -0.335832595825195 ], [ -51.025001525878906, -0.24888801574707 ], [ -50.888618469238281, -0.291389465332031 ], [ -50.9072265625, -0.335832595825195 ] ] ], [ [ [ -49.713340759277344, -0.227777481079102 ], [ -48.373062133789062, -0.289167404174805 ], [ -48.627227783203125, -1.064443588256836 ], [ -49.166389465332031, -1.613887786865234 ], [ -50.578056335449219, -1.800832748413086 ], [ -50.803611755371094, -1.440555572509766 ], [ -50.781112670898438, -1.151945114135742 ], [ -50.550003051757812, -1.06916618347168 ], [ -50.796951293945312, -0.971942901611328 ], [ -50.657783508300781, -0.279167175292969 ], [ -49.713340759277344, -0.227777481079102 ] ] ], [ [ [ -50.803337097167969, -0.358888626098633 ], [ -50.908058166503906, -0.358331680297852 ], [ -50.748893737792969, -0.226667404174805 ], [ -50.803337097167969, -0.358888626098633 ] ] ], [ [ [ -51.380561828613281, -0.484722137451172 ], [ -51.103057861328125, -0.121389389038086 ], [ -51.137504577636719, -0.2852783203125 ], [ -51.380561828613281, -0.484722137451172 ] ] ], [ [ [ -50.55694580078125, -0.0625 ], [ -50.857780456542969, -0.283056259155273 ], [ -51.027229309082031, -0.224166870117188 ], [ -50.55694580078125, -0.0625 ] ] ], [ [ [ -50.90167236328125, -0.04749870300293 ], [ -50.829727172851562, 0.060834884643555 ], [ -50.697502136230469, 0.023889541625977 ], [ -50.90167236328125, -0.04749870300293 ] ] ], [ [ [ -49.525558471679688, -0.134443283081055 ], [ -49.852500915527344, -0.064443588256836 ], [ -49.501670837402344, 0.070558547973633 ], [ -49.525558471679688, -0.134443283081055 ] ] ], [ [ [ -50.455558776855469, -0.022777557373047 ], [ -50.643333435058594, 0.171110153198242 ], [ -50.465003967285156, 0.146669387817383 ], [ -50.455558776855469, -0.022777557373047 ] ] ], [ [ [ -49.636116027832031, 0.227502822875977 ], [ -49.984725952148438, -0.072221755981445 ], [ -50.392501831054688, 0.109445571899414 ], [ -49.636116027832031, 0.227502822875977 ] ] ], [ [ [ -50.243057250976562, 0.22944450378418 ], [ -50.184173583984375, 0.324167251586914 ], [ -50.0836181640625, 0.320001602172852 ], [ -50.243057250976562, 0.22944450378418 ] ] ], [ [ [ -50.416389465332031, 0.210832595825195 ], [ -50.536392211914062, 0.226110458374023 ], [ -50.373893737792969, 0.621389389038086 ], [ -50.416389465332031, 0.210832595825195 ] ] ], [ [ [ -50.237503051757812, 0.350835800170898 ], [ -50.308059692382812, 0.506391525268555 ], [ -50.063613891601562, 0.646112442016602 ], [ -50.237503051757812, 0.350835800170898 ] ] ], [ [ [ -50.007225036621094, 0.88166618347168 ], [ -50.267784118652344, 0.751668930053711 ], [ -50.2005615234375, 0.879167556762695 ], [ -50.007225036621094, 0.88166618347168 ] ] ], [ [ [ -50.037506103515625, 0.884443283081055 ], [ -50.093894958496094, 0.920835494995117 ], [ -50.042228698730469, 0.918058395385742 ], [ -50.037506103515625, 0.884443283081055 ] ] ], [ [ [ -50.009445190429688, 0.935277938842773 ], [ -50.074447631835938, 0.981111526489258 ], [ -49.947784423828125, 1.054445266723633 ], [ -50.009445190429688, 0.935277938842773 ] ] ], [ [ [ -50.396665573120117, 1.881391525268555 ], [ -50.5050048828125, 2.024999618530273 ], [ -50.356117248535156, 2.116945266723633 ], [ -50.396665573120117, 1.881391525268555 ] ] ], [ [ [ -50.47528076171875, 2.119722366333008 ], [ -50.517227172851562, 2.203054428100586 ], [ -50.405555725097656, 2.193613052368164 ], [ -50.47528076171875, 2.119722366333008 ] ] ], [ [ [ -60.098335266113281, 5.217222213745117 ], [ -60.147506713867188, 4.517499923706055 ], [ -59.675834655761719, 4.388887405395508 ], [ -59.568611145019531, 3.899446487426758 ], [ -59.989448547363281, 2.693613052368164 ], [ -59.642784118652344, 1.731111526489258 ], [ -58.80694580078125, 1.185556411743164 ], [ -57.324722290039062, 1.975278854370117 ], [ -56.470634460449219, 1.944498062133789 ], [ -55.904167175292969, 1.893056869506836 ], [ -55.965835571289062, 2.532777786254883 ], [ -54.603782653808594, 2.329195022583008 ], [ -52.90972900390625, 2.195833206176758 ], [ -51.684066772460938, 4.034162521362305 ], [ -51.447784423828125, 3.972501754760742 ], [ -51.537506103515625, 4.391389846801758 ], [ -51.088615417480469, 3.91166877746582 ], [ -50.679725646972656, 2.164724349975586 ], [ -50.445281982421875, 1.825834274291992 ], [ -49.930000305175781, 1.70805549621582 ], [ -50.1219482421875, 1.214166641235352 ], [ -49.903892517089844, 1.170278549194336 ], [ -51.258613586425781, -0.142778396606445 ], [ -51.700004577636719, -0.752498626708984 ], [ -51.712501525878906, -1.026666641235352 ], [ -51.920005798339844, -1.166389465332031 ], [ -51.928337097167969, -1.337778091430664 ], [ -52.0675048828125, -1.420000076293945 ], [ -52.232505798339844, -1.345277786254883 ], [ -52.712783813476562, -1.60333251953125 ], [ -52.208469390869141, -1.69207763671875 ], [ -51.257225036621094, -1.218332290649414 ], [ -50.992782592773438, -0.998611450195312 ], [ -51.009170532226562, -0.949167251586914 ], [ -50.992225646972656, -0.925277709960938 ], [ -50.85833740234375, -0.913610458374023 ], [ -50.816673278808594, -1.439722061157227 ], [ -50.663894653320312, -1.767778396606445 ], [ -51.336944580078125, -1.646944046020508 ], [ -51.451950073242188, -2.273611068725586 ], [ -51.307502746582031, -1.76361083984375 ], [ -50.846115112304688, -2.508609771728516 ], [ -50.983894348144531, -2.066110610961914 ], [ -50.706390380859375, -2.220556259155273 ], [ -50.677955627441406, -1.810443878173828 ], [ -49.289726257324219, -1.708332061767578 ], [ -49.49000358581543, -2.564998626708984 ], [ -48.697225570678711, -1.469165802001953 ], [ -48.430557250976562, -1.661666870117188 ], [ -48.413612365722656, -1.499443054199219 ], [ -48.1844482421875, -1.471944808959961 ], [ -48.503059387207031, -1.458332061767578 ], [ -48.479171752929688, -1.301942825317383 ], [ -48.331672668457031, -1.308332443237305 ], [ -48.292228698730469, -0.944999694824219 ], [ -48.060562133789062, -0.710832595825195 ], [ -47.956947326660156, -0.775278091430664 ], [ -47.74945068359375, -0.635276794433594 ], [ -47.726951599121094, -0.758054733276367 ], [ -47.542503356933594, -0.636667251586914 ], [ -47.393890380859375, -0.812778472900391 ], [ -47.431394577026367, -0.582500457763672 ], [ -46.954727172851562, -0.704444885253906 ], [ -46.951118469238281, -0.908056259155273 ], [ -46.821670532226562, -0.712778091430664 ], [ -46.604171752929688, -1.029443740844727 ], [ -46.557785034179688, -0.999166488647461 ], [ -46.535835266113281, -1.032220840454102 ], [ -46.448333740234375, -1.043054580688477 ], [ -46.191947937011719, -0.957500457763672 ], [ -46.259725570678711, -1.183610916137695 ], [ -46.0433349609375, -1.210277557373047 ], [ -45.974723815917969, -1.07499885559082 ], [ -45.851951599121094, -1.271944046020508 ], [ -45.735557556152344, -1.180000305175781 ], [ -45.696113586425781, -1.370277404785156 ], [ -45.446945190429688, -1.310832977294922 ], [ -45.462226867675781, -1.545555114746094 ], [ -45.326667785644531, -1.313333511352539 ], [ -45.347503662109375, -1.740278244018555 ], [ -44.860282897949219, -1.425277709960938 ], [ -44.951393127441406, -1.601667404174805 ], [ -44.820556640625, -1.578332901000977 ], [ -44.799171447753906, -1.704999923706055 ], [ -44.69500732421875, -1.817777633666992 ], [ -44.538894653320312, -1.832221984863281 ], [ -44.490562438964844, -1.980833053588867 ], [ -44.656394958496094, -2.331110000610352 ], [ -44.360000610351562, -2.338888168334961 ], [ -44.582229614257812, -2.556943893432617 ], [ -44.786392211914062, -3.29749870300293 ], [ -44.420562744140625, -2.930000305175781 ], [ -44.356948852539062, -2.526666641235352 ], [ -44.063339233398438, -2.405834197998047 ], [ -44.339729309082031, -2.830278396606445 ], [ -43.347503662109375, -2.365833282470703 ], [ -41.248069763183594, -3.023553848266602 ], [ -39.9969482421875, -2.84638786315918 ], [ -37.174446105957031, -4.918611526489258 ], [ -35.417503356933594, -5.2147216796875 ], [ -34.800834655761719, -7.631111145019531 ], [ -35.292778015136719, -9.180000305175781 ], [ -36.393333435058594, -10.492500305175781 ], [ -37.021665573120117, -10.935834884643555 ], [ -37.153335571289062, -10.748611450195312 ], [ -38.041389465332031, -12.633056640625 ], [ -38.488616943359375, -13.020000457763672 ], [ -38.691673278808594, -12.577777862548828 ], [ -38.901115417480469, -12.705556869506836 ], [ -38.72528076171875, -12.874444961547852 ], [ -38.956672668457031, -13.380001068115234 ], [ -39.056394577026367, -13.377500534057617 ], [ -39.080284118652344, -13.538333892822266 ], [ -38.963058471679688, -13.681390762329102 ], [ -39.038894653320312, -14.175834655761719 ], [ -38.920562744140625, -13.915555953979492 ], [ -39.066947937011719, -14.643890380859375 ], [ -38.8719482421875, -15.874168395996094 ], [ -39.206672668457031, -17.147502899169922 ], [ -39.130834579467773, -17.683891296386719 ], [ -39.64361572265625, -18.223335266113281 ], [ -39.8013916015625, -19.632503509521484 ], [ -40.960556030273438, -21.235836029052734 ], [ -40.971672058105469, -21.988056182861328 ], [ -41.7630615234375, -22.346111297607422 ], [ -42.034446716308594, -22.919170379638672 ], [ -43.091949462890625, -22.954723358154297 ], [ -43.075836181640625, -22.6683349609375 ], [ -43.218338012695312, -22.9969482421875 ], [ -44.662506103515625, -23.048057556152344 ], [ -44.577224731445312, -23.356113433837891 ], [ -45.4183349609375, -23.830833435058594 ], [ -46.382781982421875, -23.868335723876953 ], [ -48.026115417480469, -25.015003204345703 ], [ -48.2086181640625, -25.461669921875 ], [ -48.131393432617188, -25.272224426269531 ], [ -48.718612670898438, -25.424724578857422 ], [ -48.36138916015625, -25.576389312744141 ], [ -48.770561218261719, -25.880001068115234 ], [ -48.581947326660156, -26.180000305175781 ], [ -48.80250358581543, -26.067222595214844 ], [ -48.485282897949219, -27.211391448974609 ], [ -48.774726867675781, -28.522224426269531 ], [ -49.75250244140625, -29.369724273681641 ], [ -50.74945068359375, -31.081111907958984 ], [ -52.072502136230469, -32.174171447753906 ], [ -52.086395263671875, -31.823612213134766 ], [ -51.251396179199219, -31.471668243408203 ], [ -50.567222595214844, -30.457225799560547 ], [ -50.608894348144531, -30.190555572509766 ], [ -50.928337097167969, -30.419445037841797 ], [ -51.281669616699219, -30.010002136230469 ], [ -51.2711181640625, -30.795558929443359 ], [ -51.965278625488281, -31.339447021484375 ], [ -52.636672973632812, -33.129447937011719 ], [ -53.374298095703125, -33.740669250488281 ], [ -53.522781372070312, -33.147781372070312 ], [ -53.093055725097656, -32.729728698730469 ], [ -53.879722595214844, -31.967781066894531 ], [ -55.581947326660156, -30.845836639404297 ], [ -56.008922576904297, -31.079793930053711 ], [ -56.811393737792969, -30.105278015136719 ], [ -57.608001708984375, -30.184925079345703 ], [ -55.765281677246094, -28.226112365722656 ], [ -53.807785034179688, -27.129169464111328 ], [ -53.863334655761719, -25.681114196777344 ], [ -54.598915100097656, -25.573223114013672 ], [ -54.330558776855469, -24.679449081420898 ], [ -54.4072265625, -23.916667938232422 ], [ -55.411666870117188, -23.956390380859375 ], [ -55.849723815917969, -22.288890838623047 ], [ -57.985107421875, -22.091827392578125 ], [ -57.814443588256836, -20.971946716308594 ], [ -58.158889770507812, -20.168054580688477 ], [ -57.848747253417969, -19.978794097900391 ], [ -58.121116638183594, -19.741390228271484 ], [ -57.5211181640625, -18.203891754150391 ], [ -57.743057250976562, -17.593055725097656 ], [ -58.397506713867188, -17.249168395996094 ], [ -58.327507019042969, -16.279167175292969 ], [ -60.1602783203125, -16.263057708740234 ], [ -60.571395874023438, -15.097501754760742 ], [ -60.258895874023438, -15.093612670898438 ], [ -60.470840454101562, -13.807222366333008 ], [ -61.038978576660156, -13.493118286132812 ], [ -61.833892822265625, -13.544723510742188 ], [ -63.075004577636719, -12.650001525878906 ], [ -64.394180297851562, -12.461668014526367 ], [ -64.991668701171875, -12.008056640625 ], [ -65.392791748046875, -11.266389846801758 ], [ -65.3819580078125, -9.697778701782227 ], [ -66.634445190429688, -9.906946182250977 ], [ -68.583450317382812, -11.106138229370117 ], [ -69.568435668945312, -10.951091766357422 ], [ -70.631393432617188, -11.009166717529297 ], [ -70.514663696289062, -9.428001403808594 ], [ -71.29888916015625, -9.996389389038086 ], [ -72.143890380859375, -10.004722595214844 ], [ -72.36639404296875, -9.49444580078125 ], [ -73.205291748046875, -9.407222747802734 ], [ -72.96417236328125, -8.983333587646484 ], [ -74.01055908203125, -7.541389465332031 ], [ -73.744171142578125, -6.876943588256836 ], [ -73.1239013671875, -6.447221755981445 ], [ -72.851959228515625, -5.124721527099609 ], [ -70.765838623046875, -4.146389007568359 ], [ -69.956924438476562, -4.236873626708984 ], [ -69.378067016601562, -1.338054656982422 ], [ -69.607513427734375, -0.517499923706055 ], [ -70.058059692382812, -0.157499313354492 ], [ -70.044174194335938, 0.59083366394043 ], [ -69.124725341796875, 0.645002365112305 ], [ -69.270004272460938, 1.038335800170898 ], [ -69.84222412109375, 1.072221755981445 ], [ -69.846099853515625, 1.710454940795898 ], [ -68.153060913085938, 1.72416877746582 ], [ -68.196395874023438, 1.977502822875977 ], [ -67.91473388671875, 1.745279312133789 ], [ -67.424179077148438, 2.143888473510742 ], [ -67.076675415039062, 1.173334121704102 ], [ -66.87188720703125, 1.221643447875977 ], [ -66.31195068359375, 0.750558853149414 ], [ -65.589736938476562, 0.989168167114258 ], [ -65.518890380859375, 0.649721145629883 ], [ -63.393058776855469, 2.151388168334961 ], [ -63.361114501953125, 2.419168472290039 ], [ -64.045013427734375, 2.482500076293945 ], [ -64.191116333007812, 3.594446182250977 ], [ -64.7952880859375, 4.281389236450195 ], [ -64.017791748046875, 3.886110305786133 ], [ -63.343055725097656, 3.961111068725586 ], [ -62.875, 3.560277938842773 ], [ -62.745834350585938, 4.032499313354492 ], [ -60.985000610351562, 4.52055549621582 ], [ -60.579727172851562, 4.94666862487793 ], [ -60.730369567871094, 5.204801559448242 ], [ -60.098335266113281, 5.217222213745117 ] ] ] ]
   		      },
		}
    ]};



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



//%%%% HIGHLIGHTING / MOUSEOVER der Länder und Zoomin %%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//


var geojson;

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
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


//add to map
geojson = L.geoJson(countries,{
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);




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
    this._div.innerHTML = '<h4>Alternatives to Tobacco</h4>' +  
        (props ?
        '<b>' + props.name_country + '</b><br />' + 'Gini Coefficient: ' + props.gini_coefficient + '<br>' 
                                          + 'Global Hunger Index: ' + props.global_hunger_index + '<br>'
                                          + 'Cigarette Consumption per capita: ' + props.cigarette_consumption_per_capita + '<br>'
                                          + 'Land devoted to growing tobacco: ' + props.land_devoted_to_tobacco + '<br>'
                                          + 'sources: ' + props.sources
        : 'Mousover a state ');
};

info.addTo(map);

          
          //%%%%% INFOKASTEN II für Projekte ohne Lokalisation %%%%//
          //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%////////////////

         

              var info_project = L.control();
              
              info_project.onAdd = function (map) {
                  this._div = L.DomUtil.create('div', 'info_project'); // create a div with a class "info"
                  this.update();
                  return this._div;
              };
              
              // method that we will use to update the control based on feature properties passed
              info_project.update = function (props) {
                  this._div.innerHTML = '<h4>Projects</h4>' +  
                      (props ?
                      '<b>' + props.name_project + '</b><br />' + '(' + props.abbreviation + ')' + '<br>'
                            + 'Website: ' + props.website_url_organisation
                      : 'Mousover a state or click for located projects');
              };
          
              info_project.addTo(map);
         



//%%%%% DATEN für Popup | PROJEKTLAYER %%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//


var projects = 

{
 	"type": "FeatureCollection",
 	"features": 
	[
		{
    			"type": "Feature",
    			"properties": 
				{
				"name":"Tobacco to Bamboo",
				"description":"BlindtextBlindtextBlindtextBlindtextBlindtextBlindtext",
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


var Layer_project = L.geoJson(projects, {
    onEachFeature: yourOnEachFeatureFunction
});



function yourOnEachFeatureFunction(feature, layer){
    if (feature.properties.name) {
        layer.bindPopup('<b>' + feature.properties.name + '</b>' + '<br>' +
                        feature.properties.description + '<br>' +
                        'Website: ' + feature.properties.website_url + '<br>' +
                        'Contact: ' + feature.properties.contact_email
                        );
    }
}




//%%%% ZOOMLEVELS %%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

// Definition Zoomstufen für Projektlayer
map.on('zoomend ', function(e) {
         if ( map.getZoom() <= 4 ){ map.removeLayer( Layer_project )}
         else if ( map.getZoom() > 4 ){ map.addLayer( Layer_project )}
    });
                     
                     
                     
                     
                     
                     
                             