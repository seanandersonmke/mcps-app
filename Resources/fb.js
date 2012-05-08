var mcps = {};
mcps.ui = require('ui');

/* Start Facebook Code */
function createFbWindow(name){
	var win = mcps.ui.createBaseWindow('FaceBook Window');
	var msg_txt = "Having a blast at " + name + "! Thanks MCPS!!";
	
	var header = Ti.UI.createLabel({
		text: 'Post to Facebook',
		top: '18%',
		font: {fontSize: 48}
	});
	
	var message = Ti.UI.createTextArea({
		value: msg_txt,
		top: '34%',
		width: '70%',
		height: '18%',
		color: "#000000",
		backgroundColor: "#FFFFFF",
		borderColor: "000000",
		borderRadius: 14,
		borderWidth: 2,
		blur: true, // blur = out of focus; stops softkeyboard from popping
		font: {fontSize: 12}
	});
	
	var mhead = Ti.UI.createLabel({
		text: 'Message:',
		top: '28%',
		color: "#FFFFFF",
		left: '15%'
	});
	
	var view = Ti.UI.createView({
		height: 150,
		width: 250,
		top: '58%'
	});
	
	var image = Ti.UI.createImageView({
		image: '/images/splash.png',
		width: 'auto',
		height: 'auto'
	});
	
	view.add(image);
	
	var post_button = Ti.UI.createButton({
		title: "Post to Wall",
		bottom: "12%",
		left: "20%",
		width: 140,
		height: 40,
		color: "#FFFFFF",
		backgroundColor: "#004C00",
		borderRadius: 8
	});
	
	var pic_button = Ti.UI.createButton({
		title: "Add Picture",
		bottom: '12%',
		right: '20%',
		width: 140,
		height: 40,
		color: '#FFFFFF',
		backgroundColor: "#004C00",
		borderRadius: 8
	});
	
	
	/* Event Listeners */
	post_button.addEventListener('click', function(e) {
		if(message.value != "") {
			msg_txt = message.value;
		}
		
		var data = {
			message: msg_txt,
			picture: image.toBlob()
		};

		Ti.Facebook.requestWithGraphPath('me/photos', data, 'POST', function(e) { 
				if(e.success) {alert('Post Successful!');} 
		});
	});
	
	pic_button.addEventListener('click', function(e) {
		Ti.Media.openPhotoGallery({
			success: function(e) {
				if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					image.setImage(e.media);
				}
			},
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	});
	
	win.add(header);
	win.add(mhead);
	win.add(message);
	win.add(view);
	win.add(post_button);
	win.add(pic_button);
	
	return win;
}

exports.createFaceBookButton = function(e){
	
	Ti.Facebook.appid = '184482501591139';
	Ti.Facebook.permissions = ['publish_stream']; // Set permissions for FB
	Ti.Facebook.addEventListener('login', function(e) {
		if(e.success) {
			alert('Logged In');
		}
	});
	Ti.Facebook.addEventListener('logout', function(e) {
		alert('Logged out');
	});

	return Ti.Facebook.createLoginButton();
};

exports.createShareButton = function (e, name){ // x = top value
	var share = Ti.UI.createButton({
		backgroundImage: '/images/fbshare.png',
		width: 122,
		height: 42
	});
	
	share.addEventListener('click', function(e) {
		var win = createFbWindow(e, name);
		win.open();
	});
	
	return share;
}
