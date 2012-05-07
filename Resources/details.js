var mcps = {};
mcps.ui = require('ui');
mcps.fb = require('fb');


exports.createParkDetailsWindow = function(link, description, title) {
	
	var wintitle = "" + title + " Details";
	var win = mcps.ui.createBaseWindow();
	
	var label = Ti.UI.createLabel({
		text: wintitle,
		top: '20%',
		color: '#FFF',
		font:{fontSize:24}
	});
	
/* This whole section will be for the map annotation on the details screen once you click 'View Map'
*	var parksView = Ti.Map.createAnnotation({
*		this function gets populated with the matching data from the park
*		located at http://api.milwaukeecounty.org/MobileAPI.svc/ParksInfo
*		not sure how to link each park to the feed from the details window
*		e.g., I'm already in the details window for park XYZ, go find that 
*		info from the feed and pull just that and nothing else.
*	});
*/
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude:43.04882, longitude:-87.907104,
				 latitudeDelta:0.01, longitudeDelta:0.01},
		regionFit:true,
		animate:true,
		userLocation:true,
		// annotations:[parksView]
	});
	
	var button = Ti.UI.createLabel({
		text: 'View Map',
		top: '35%',
		color: '#FFF',
		backgroundColor: '#050',
		borderWidth: 2,
		borderRadius: 4,
		font:{fontSize:16}
	});
	
	button.addEventListener('click', function(e){
		var win1 = Ti.UI.createWindow({title:'Park Map'});
		win1.add(image);
		win1.open()
	});
	
	var desc = Ti.UI.createLabel({
		text: description,
		top: '50%',
		textAlign: 'center',
		backgroundColor: '#050',
		color: '#FFF',
		borderRadius: 4,
		autoLink: Ti.UI.Android.LINKIFY_ALL
	});
	
	win.add(label);
	win.add(button);
	win.add(desc);

	return win;
}

exports.createEventDetailsWindow = function(edesc, eloc, edetail, etime) {
		var win = mcps.ui.createBaseWindow(edesc);
		
		var label = Ti.UI.createLabel({
			text: edesc,
			top: '20%',
			color: '#FFF',
			font:{fontSize:24}
		});
		var time = Ti.UI.createLabel({
			text: etime,
			top: '30%',
			color: '#FFF'
		});
		var place = Ti.UI.createLabel({
			text: eloc,
			top: '35%',
			color: '#FFF'
		});
		var desc = Ti.UI.createLabel({
			text: edetail,
			top: '50%',
			width: '90%',
			height: '20%',
			backgroundColor: '#050',
			color: '#FFF',
			borderRadius: 4,
			opacity: 0.5,
			autoLink: Ti.UI.Android.LINKIFY_ALL
		});
		
		win.add(label);
		win.add(time);
		win.add(place);
		win.add(desc);
		
		return win;
}
