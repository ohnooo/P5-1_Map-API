//*************** Map ***************//


	var map;
	var address = "Space Needle Seattle, wa";

	/**
	* called after google map is loaded
	* create the map
	*/
	function initMap() {
		// 'self' refers to InitMap
		var self = this;

		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 47.6149938, lng: -122.2915567},
			zoom: 10
		});

		// Auto center map based on pins
		// http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers

		// Create empty LatLngBounds
  		var bounds = new google.maps.LatLngBounds();
  		//console.log(window.mapBounds);
  		// Create infowindow obj to pass
		var infowindow = new google.maps.InfoWindow({
			content: '',
			maxWidth: 200
		});

		/**
		* Reads Google Geocoder result to create map pins
		* @param {string} placeData - object return from geocodeAddress
		* Single location
		*/
		self.setMarker = function(placeData, setMarkerData){

			//console.log(placeData);

			// Save location data from the search result to local variables
			var lat = placeData.geometry.location.lat();	// latitude -> place service
			var lon = placeData.geometry.location.lng();	// longitude -> place service
			var address = placeData.formatted_address;
			var name = address.split(',')[0];;
			// https://developers.google.com/maps/documentation/javascript/geocoding

			// Custom marker
			var markerIcon = {
				url: 'image/android-locate.png',
				scaledSize: new google.maps.Size(30,30)
			};

			var marker = new google.maps.Marker({
				map: map,
				position: placeData.geometry.location,
				// not sure yet
				title: name,
				icon:markerIcon
			});

			//extend the bounds to include each marker's position
			bounds.extend(marker.position);	// current boundaries of the map

			google.maps.event.addListener(marker, 'click', function(){
				setInfoWindow(marker, name, address, infowindow);
				// Hide navigation viewed on mobile
    			// vm.hideNav();
			});

			// Check if call back is function
			// CallBack function to set information to place
			if(typeof setMarkerData === "function"){
				setMarkerData(marker);
			}
			//now fit the map to the newly inclusive bounds
			map.fitBounds(bounds);
		};

		/**
		* called by ViewModel for each new location
		* @param {String} name = this is place's name
		* GeoCode api services
		*/
		self.geocodeAddress = function(locationNames, setGoogleData){
			var googleData;

			var geocoder = new google.maps.Geocoder();
			//console.log(locationNames);
			var request = {
				address: locationNames.name
			};
			//console.log(request);
			geocoder.geocode(request, function(results, status){
				if(status === google.maps.GeocoderStatus.OK){
					//console.log(results[0]);

					// Check if callback is a function
					// Resournce http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
					if(typeof setGoogleData === "function"){
						setGoogleData(results[0]);
					}

				} else {
					alert("Geocode was not successful for the following reason: " + status);
				};
			});

		};



}; // Map




