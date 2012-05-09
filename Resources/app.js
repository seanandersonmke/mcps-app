Ti.UI.setBackgroundColor('#ffffff');

var mcps = {}; // project namespace

mcps.ui = require('ui'); // import ui namespace
mcps.net = require('net');
mcps.fb = require('fb');

var win = createApplicationWindow();
win.open();


function createParkWindow() {
	/* Creates the top-level park window */
	var win = mcps.ui.createBaseWindow('Park Info');
	var parks_table = mcps.net.getParkData();

	parks_table.setHeight('70%');
	parks_table.setTop('18%');
	parks_table.setOpacity(0.6);	

	win.add(parks_table);
	
	return win;
}

function createEventWindow() {
	/* Creates the top-level event window */
	var win = mcps.ui.createBaseWindow('Event Info');
	var events_table = mcps.net.getEventData();
	
	events_table.setHeaderTitle('Event Info');
	events_table.setHeight('70%');
	events_table.setTop('18%');
	events_table.setOpacity(0.6);
	
	var optview = 
	win.add(events_table);
	
	return win;
}

function createApplicationWindow() {
	
	var win = mcps.ui.createBaseWindow('Main Window');
	
	var park_button = Ti.UI.createView({
		backgroundColor: '#050',
		opacity:0.6,
		zIndex:0,
		top: '20%',
		left:'2%',
		right:'2%',
		height:'18%',
		width:'auto'
	});
	var park_button_label = Ti.UI.createLabel({
		text:'Parks',
		zIndex:1,
		color: '#FFF',
		font:{fontSize:42}
	});
		
	var event_button = Ti.UI.createView({
		backgroundColor: '#050',
		opacity:0.6,
		zIndex:0,
		top: '40%',
		left:'2%',
		right:'2%',
		height:'18%',
		width:'auto'
	});
	var event_button_label = Ti.UI.createLabel({
		text:'Events',
		color: '#FFF',
		zIndex:1,
		font:{fontSize:42}
	});
	
	var activity_button = Ti.UI.createView({
		backgroundColor: '#050',
		opacity:0.6,
		zIndex:0,
		top: '60%',
		left:'2%',
		right:'2%',
		height:'18%',
		width:'auto'
	});
		var activity_button_label = Ti.UI.createLabel({
		text:'Activities',
		zIndex:1,
		color: '#FFF',
		font:{fontSize:42}
	});
	//arrow graphic
	var arrow = Ti.UI.createImageView({
					image:'/images/Arrow.png',
					right:'10%',
					zIndex:3
		});
/* Event Listeners */
	park_button.addEventListener('click', function(e) {
		var park_window = createParkWindow();
		park_window.open();
	});
	
	event_button.addEventListener('click', function(e) {
		var event_window = createEventWindow();
		event_window.open();
	});
	
	activity_button.addEventListener('click', function(e) {
		alert('Coming soon!');
	});
	
	var fb = mcps.fb.createFaceBookButton();
	fb.setBottom(0); fb.setLeft(0); //layout fb button
	
	/* Add everything to the window */
	win.add(park_button);
	park_button.add(park_button_label);
	
	win.add(event_button);
	event_button.add(event_button_label);
	
	win.add(activity_button);
	activity_button.add(activity_button_label);
	
	win.add(fb);
	
	park_button.add(arrow);
	event_button.add(arrow);
	activity_button.add(arrow);
	
	return win;
}