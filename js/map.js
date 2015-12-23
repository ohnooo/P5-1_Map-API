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
			center: {lat: 47.6149938, lng: -122.4763307},
			zoom: 10
		});

		// Sets the boundaries of the map based on pin locations
  		window.mapBounds = new google.maps.LatLngBounds();

		/**
		* Reads Google Geocoder result to create map pins
		* @param {string} placeData - object return from geocodeAddress
		* Single location
		*/
		self.setMarker = function(placeData){

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

		};

		/**
		* called by geocodeAddress
		* @param {array} result = array of location services
		* @param {boolean} status = whether search result
		*
		*/

		self.callback = function(results, status){
			if(status === google.maps.GeocoderStatus.OK){
				console.log(results);
				//for(var i = 0; i<results.length; i++){
					self.setMarker(results[0]);
				//};
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			};
		};

		/**
		* called by ViewModel for each new location
		* @param {String} name = this is place's name
		* GeoCode api services
		*/
		self.geocodeAddress = function(locationNames){
			//console.log(locationNames);
				// returns Array obj
				// {'name' 		: 'Space Needle',
				// 'address' 	: '400 Broad St,',
				// 'cityState'	: 'Seattle, WA'}
				//

			var geocoder = new google.maps.Geocoder();
			//console.log(locationNames);
			for(var i = 0; i<locationNames.length; i++){
				var request = {
					address: locationNames[i].name
				};

			geocoder.geocode(request, self.callback);

			};

		};



}; // Map




