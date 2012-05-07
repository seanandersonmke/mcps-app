Ti.UI.setBackgroundColor('#ffffff');

var mcps = {}; // project namespace

mcps.ui = require('ui'); // import ui namespace
mcps.net = require('net');
//mcps.details = require('details');
mcps.fb = require('fb');

var win = createApplicationWindow();
win.open();


function createParkWindow() {
	/* Creates the top-level park window */
	var win = mcps.ui.createBaseWindow('Park Info');
	var parks_table = mcps.net.getParkData();
	
	// parks_table.set[BackgroundColor, HeaderTitle, Height, Opacity, ]
	// parks_table.setHeaderTitle('Park Information');
	parks_table.setHeight(150);
	parks_table.setTop('20%');
	parks_table.setBackgroundImage('images/BlankBtn.png');	
	
	win.add(parks_table);
	
	return win;
}

function createEventWindow() {
	/* Creates the top-level event window */
	var win = mcps.ui.createBaseWindow('Event Info');
	var events_table = mcps.net.getEventData();
	
	events_table.setHeaderTitle('Event Info');
	events_table.setHeight(150);
	events_table.setTop(80);
	events_table.setOpacity(0.6);
	
	var optview = 
	win.add(events_table);
	
	return win;
}

function createApplicationWindow() {
	
	var win = mcps.ui.createBaseWindow('Main Window');
	
	var park_button = Ti.UI.createButton({
		image:'./images/ParksBtn.png',
		top: '25%',
		left: 10

	});
	
	var event_button = Ti.UI.createButton({
		image:'./images/EventsBtn.png',
		top: '45%',
		left: 10

	});
	
	var activity_button = Ti.UI.createButton({
		image:'./images/ActivitiesBtn.png',
		top:'65%',
		left: 10
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
	
	var fb = mcps.fb.createFaceBookButton();
	
	/* Add everything to the window */
	win.add(park_button);
	win.add(event_button);
	win.add(activity_button);
	win.add(fb);
	
	return win;
}