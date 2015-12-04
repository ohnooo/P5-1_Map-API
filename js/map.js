//*************** Map ***************//

	var map;
	var address = "Space Needle Seattle, wa";

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.0971086, lng: -102.1868685},
			zoom: 4
		});

		var geocoder = new google.maps.Geocoder();
		//Set zoom increments
		/*map.addListener('click', function(){
		map.setZoom(8);

		});*/

		geocodeAddress(geocoder, map);

		function getLocationNames(){
			var locationNames = [];

			for(var i = 0; i<locations.length ; i++){
				locationNames.push(locations[i].name + ' ' + locations[i].cityState);
			}

			return locationNames;
		};

		function setMarker(placeData){

			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location,
				// not sure yet
				title: name
			});

			var contentString = 'Wiki API..... or others pull in location information'

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			marker.addListener('click', function(){
				infowindow.open(map, maker);
			});

		}


		function geocodeAddress (geocoder, resultsMap){
			// alert('geocode');
			geocoder.geocode({'address': address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					//resultsMap.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: resultsMap,
						position: results[0].geometry.location
				});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				};
	        });
		};

	};