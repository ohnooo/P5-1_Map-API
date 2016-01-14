// inforwindow

// Using New York Times API
// http://developer.nytimes.com/docs

// Called when ever a marker is clicked
// @param : {marker} - map marker object from map.js
// @param : {name} - name of the location
// @param : {address} - formatted address
// google geocoder service request
function setInfoWindow(marker, name, address, infowindow){
    // Hide navigation viewed on mobile
    vm.hideNav();

	//animate the marker for 1500 ms
	marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
		marker.setAnimation(null);
	}, 1500);

	// Basic url, api key variables
	var nytBaseUrl = "http://api.nytimes.com/svc/search/v2/articlesearch";
	var apiKey = "3a4c046f69c5a24276d0ea647da42441:18:73145017";
	var articles ;

	var nytUrl = nytBaseUrl + ".json?q=" + name + "&sort=newest&api-key=" + apiKey;
    console.log(nytUrl);

    var infoText;

    $.getJSON(nytUrl, function(data){
    	// Articles links
    	articles = data.response.docs;

    	for(var i=0; i<articles.length; i++){
    		var article = articles[i];

    		infoText = '<div>'+
    						'<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
    						'<p>' + article.snippet + '</p>' +
    						'</div>';
    	}

    	infowindow.setContent(infoText);
    	infowindow.open(map, marker);


    }).fail(function(){
    	infoContent = '<div><p>New York Times Articles: Could not be found.</p></div>';
    	infowindow.setContent(infoText);
    	infowindow.open(map, marker);
    });

};  // end setInfoWindow
