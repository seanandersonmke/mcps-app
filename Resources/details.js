var mcps = {};
mcps.ui = require('ui');

exports.createParkDetailsWindow = function(link, description, title) {
	
	var wintitle = "" + title + " Details";
	var win = mcps.ui.createBaseWindow(wintitle);
	
	var label = Ti.UI.createLabel({
		text: wintitle,
		top: '20%',
		color: '#FFF',
		font:{fontSize:24}
	});
	
	var image = Ti.UI.createWebView({url:link});
	
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
