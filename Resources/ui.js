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

exports.createBackButton = function (e, win) {
	var back = Ti.UI.createButton({
		title: 'Back',
		width: 122,
		height: 50
	});
	
	back.addEventListener('click', function(e) {
		win.close();
	});
	
	return back;
}
