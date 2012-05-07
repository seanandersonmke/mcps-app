
/* Start Facebook Code */


function postToFaceBook(){

	var imgView = Ti.UI.createImageView({
			image:'/images/mcps_trans.png',
			bottom: 25,
			height: 'auto',
			width: 'auto'
		});

	var data = {
  		message: 'I\'m currently enjoying a Milwaukee County park!',
  		picture: imgView.toBlob()
  	}
  	
	Ti.Facebook.requestWithGraphPath('me/photos', data, 'POST', function(e) { 
				if(e.success) {alert('FB Post Sucessfull');} 
		});
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

exports.createFBShareButton = function (e, x) { // x = top value
	var share = Ti.UI.createButton({
		title: 'Share to Facebook',
		top: x,
		width: 200,
		height: 100
	});
	
	share.addEventListener('click', function(e) {
		postToFaceBook();
	});
	
	return share;
}
