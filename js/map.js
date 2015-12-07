//*************** Map ***************//

	var map;
	var address = "Space Needle Seattle, wa";

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.0971086, lng: -102.1868685},
			zoom: 4
		});

		// var geocoder = new google.maps.Geocoder();
		//Set zoom increments
		/*map.addListener('click', function(){
		map.setZoom(8);

		});*/

		geocodeAddress();

		function getLocationNames(){
			var locationNames = [];

			for(var i = 0; i<locations.length ; i++){
				locationNames.push(locations[i].name + ' ' + locations[i].cityState);
			}

			return locationNames;
		};

		function setMarker(placeData){

			// Save location data from the search result to local variables
			var lat = placeData.geometry.location.lat();	// latitude -> place service
			var lon = placeData.geometry.location.lng();	// longitude -> place service

			// https://developers.google.com/maps/documentation/javascript/geocoding
			var name = placeData.formatted_address;
			var bounds = window.mapBounds;					// current boundaries of the map

			var marker = new google.maps.Marker({
				map: map,
				position: placeData.geometry.location,
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

		function callback(results, status){
			if(status === google.maps.GeocoderStatus.OK){
				for(var i = 0; i<results.length; i++){
					setMarker(results[i]);
				};
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			};
		}


		function geocodeAddress (geocoder, resultsMap){
			// alert('geocode');
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': address}, callback);
		};

	};