exports.createBaseWindow = function(winTitle) {
	/* Creates basic window w/ search and logo. Use to spawn other pages */
	var win = Ti.UI.createWindow({
		title: winTitle,
		backgroundImage:'./images/bg.png',
		fullscreen: false, // needed to force heavyweight window (back button) [droid]
		exitOnClose: true,
		navBarHidden:true
	});
	

	var logo = Ti.UI.createImageView({
		image:'./images/mcps_trans.png',
		bottom:0,
		right:'5%',
		height:'auto',
		width:'auto',
	});
	
	win.add(logo);
	return win;
}

exports.createBackButton = function (e) {
	var back = Ti.UI.createButton({
		title: 'Back',
		width: 122,
		height: 55
	});
	
	back.addEventListener('click', function(e) {
		Ti.UI.currentWindow.close();
	});
	
	return back;
}

exports.createMapView = function (data) {
    var park = Ti.Map.createAnnotation({
    	latitude: parseFloat(data.lat),
    	longitude: parseFloat(data.lon),
    	title:data.name,
    	pincolor: Ti.Map.ANNOTATION_RED,
    	animate: true,
    	myid: 1
    });
        
	var mapView = Ti.Map.createView({
            mapType:Ti.Map.STANDARD_TYPE,
            region:{latitude:43.038795, longitude:-87.906533, latitudeDelta:0.01, longitudeDelta:0.01},
			animate:true,
			regionFit:true,
			userLocation: true,
			annotations: [park]
	});
	
	mapView.addEventListener('click', function(e) {
		Ti.API.debug(e.annotation);
		if (e.annotation.myid == 1) {
			Ti.Platform.openURL('http://maps.google.com/maps?saddr=&daddr='+park.latitude+','+park.longitude);
		}
	});
	
	
   mapView.selectAnnotation(park);
   return mapView;       
}
