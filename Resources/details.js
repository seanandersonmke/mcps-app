var mcps = {};
mcps.ui = require('ui');
mcps.fb = require('fb');


exports.createParkDetailsWindow = function(data) {

	var win = mcps.ui.createBaseWindow();
	
	var label = Ti.UI.createLabel({
		text: data.name + " Details",
		top: '20%',
		color: '#FFF',
		font:{fontSize:24}
	});
	
	var button = Ti.UI.createButton({
		title: 'View Map',
		top: '35%',
		color: '#FFF',
		backgroundColor: '#050',
		width: 120,
		height: 40,
		borderRadius: 16,
		font:{fontSize:20}
	});
	
	button.addEventListener('click', function(e) {
		var mapwin = mcps.ui.createBaseWindow("Map");
		var map = mcps.ui.createMapView(data);
		
		mapwin.add(map);
		mapwin.open(); 
	
	});

	var desc = Ti.UI.createLabel({
		text: data.addr,
		top: '50%',
		textAlign: 'center',
		backgroundColor: '#050',
		color: '#FFF',
		borderRadius: 4,
		autoLink: Ti.UI.Android.LINKIFY_ALL
	});
	
	var back = mcps.ui.createBackButton();
	back.setBottom('15%'); back.setLeft('20%');
	
	var share = mcps.fb.createShareButton(data.name);
	share.setBottom('15%'); share.setRight('20%');
	
	
	win.add(label);
	win.add(button);
	win.add(desc);
	win.add(back);
	win.add(share);

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
		
			
		var back = mcps.ui.createBackButton();
		back.setBottom('15%'); back.setLeft('20%');
		
		var share = mcps.fb.createShareButton(edesc);
		share.setBottom('15%'); share.setRight('20%');
		
		win.add(label);
		win.add(time);
		win.add(place);
		win.add(desc);
		win.add(back);
		win.add(share);
		
		return win;
}
