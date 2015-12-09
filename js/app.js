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
		'name' 		: 'Future of Flight Aviation Center & Boeing Tour',
		'address' 	: '8415 Paine Field Blvd,',
		'cityState'	: 'Mukilteo, WA'
	}
];


//**************  ViewModel **************//

var ViewModel = function(){
	var self = this;

	self.name = ko.observableArray(locations);
	self.filter = ko.observable('');

	self.computedLocations = ko.computed(function(){

		var filterName = ko.utils.arrayFilter(self.name(), function(item){
			return item.name.toLowerCase().indexOf( self.filter().toLowerCase() ) >= 0;
		});
		//toLowerCase()

		return filterName;

	});
	//console.log(locations[0].name);
}

ko.applyBindings(new ViewModel);






// Questions for Jaili
// Ways to write functions
/*
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

TestView.init();	// locations[0].name;
*/



/*

function TestView(){

	function init(){
		return locations[0].name;
	},

	function doSomething(){
		return locations[1].name;
	},

	function doSomethingElse(){
		return locations[0].address;
	}
}
*/
