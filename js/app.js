// app.js


//**************  Model **************//
var locations = [
	{
		'name' 		: 'Space Needle',
		'address' 	: '400 Broad St,',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Pike Place Market',
		'address' 	: '',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Pioneer Square',
		'address' 	: '',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Kerry Park',
		'address' 	: '211 W Highland Dr,',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Boeing Tour',
		'address' 	: '8415 Paine Field Blvd,',
		'cityState'	: 'Mukilteo, WA'
	}
];


// Place Constructor
// Source : https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072/10

function Place(dataObj){
	this.name = dataObj.name;
	this.address = dataObj.address;
	this.cityState = dataObj.cityState;

	// Save data to Place after you pass location to google service and build marker
	this.googleServiceData = null;
	this.marker= null;
}

//**************  ViewModel **************//

var ViewModel = function(MapApp){
	// Use 'self' will always refer to the ViewModel
	var self = this;
	//console.log(initMap);

	// Build Place object out of the 'location' raw data
	self.allPlaces = ko.observableArray();
	locations.forEach(function(place){
		self.allPlaces.push(new Place(place));
	});
	//console.log(self.allPlaces());


	// Build Marker via the Maps API and place them to the Map

	self.allPlaces().forEach(function(place){

		var setGoogleData = function(data){
				place.googleServiceData = data;

				MapApp.setMarker(place.googleServiceData, setMarkerData);
			};

		var setMarkerData = function(data){
				place.marker = data;
			};

		MapApp.geocodeAddress(place, setGoogleData);

	});


	// Filter

	// Get list of location from locations data
	self.locationName = ko.observableArray(locations);
	self.userInput = ko.observable('');

	// ko.computed: the value of 'this' refers to the computed observable...
	self.visiblePlaces = ko.computed(function(){
		var filterName = ko.utils.arrayFilter(self.locationName(), function(item){
			// true or false -> see if matching
			return item.name.toLowerCase().indexOf(self.userInput().toLowerCase()) >= 0;
		});

		// change it will update / recreate marker on the google map
		//MapApp.geocodeAddress(filterName);
		//console.log(initMap.testFields);
		// Update location list
		return filterName;
	});


	// Check Data
	self.checkPlaceObject = function(){
		self.allPlaces().forEach(function(place){
			console.log(place);
		})
	};


};



//ko.applyBindings(new ViewModel);

/**
* Called when google map gets loaded from index.html
* start google map, ViewModel
*/

var vm;

var InitialApp = function(){
	var MapApp = new initMap();
	//MapApp.testView();
	// Start ViewModel to make sure it initialize after Google map loads
	//ko.applyBindings(new ViewModel(MapApp));

	vm = new ViewModel(MapApp);

	ko.applyBindings(vm);
};

















/*==========================================*/

// Questions for Jaili
// Ways to write functions
/*

Example 1:

var TestView = {

	init: function(){
		return locations[0].name;
	},

	doSomething: function(){
		return locations[1].name;
	},

	doSomethingElse: function(){
		return locations[0].address;
	}
}

I can use dote notation to call out each function

TestView.init();	// locations[0].name;
*/



/*
Example 2:

function TestView(){

	function init(){
		return locations[0].name;
	};

	function doSomething(){
		return locations[1].name;
	};

	function doSomethingElse(){
		return locations[0].address;
	};
}

TestView.init()  <-- is not a function.  How can i access init within TestView?
or in order to write note notation I have to write my functions like example 1
*/

// var InitialApp = function(){

// 	var mapObj = initMap();
// 	console.log('InitialApp: ' + mapObj);
// 	// -> undefine why?

// 	console.log('InitialApp: ' + initMap);
// 	// -> works

// 	var mapObj = new initMap();
// 	ko.applyBindings(new ViewModel(mapObj));
// };


