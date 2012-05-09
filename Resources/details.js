var mcps = {};
mcps.ui = require('ui');
mcps.fb = require('fb');


exports.createParkDetailsWindow = function(data) {

	var win = mcps.ui.createBaseWindow();
	
	var label = Ti.UI.createLabel({
		text: data.name + " Details",
		top: '3%',
		color: '#FFF',
		font:{fontSize:32}
	});
	
	var button = Ti.UI.createButton({
		title: 'View Map',
		top: '27%',
		color: '#FFF',
		backgroundColor: '#050',
		width: 200,
		height: 45,
		borderColor:'ffe512',
		borderWidth:2,
		borderRadius: 16,
		font:{fontSize:26}
	});
	
	button.addEventListener('click', function(e) {
		var mapwin = mcps.ui.createBaseWindow("Map");
		var map = mcps.ui.createMapView(data);
		
		mapwin.add(map);
		mapwin.open(); 
	
	});

	var desc = Ti.UI.createLabel({
		text: data.addr,
		textAlign:'center',
		height:'auto',
		color: '#FFF',
		font:{fontSize:24},
		zIndex: 3,
		autoLink: Ti.UI.Android.LINKIFY_ALL
	});
	var back_color =Ti.UI.createView({
		top: '65%',
		bottom:'5%',
		height:'34%',
		width:'90%',		
		textAlign: 'center',
		backgroundColor: '#000000',
		color: '#FFF',
		opacity:0.6,
		borderRadius: 4,
		borderColor:'ffe512',
		borderWidth:4,
		zIndex:2
	})
		var large_win = Ti.UI.createView({
			top:'18%',
			height:'57%',
			width:'95%',
			backgroundColor: '#050',
			opacity:0.4,
			borderRadius: 8,
			zIndex:0
		});
		

	var back = mcps.ui.createBackButton();
	back.setBottom('14%'); back.setLeft('20%');

	
	var share = mcps.fb.createShareButton(data.name);
	share.setBottom('15%'); share.setRight('20%');
	
	
	large_win.add(label);
	large_win.add(button);
	back_color.add(desc);
	win.add(back);
	win.add(share);

	win.add(large_win);
	large_win.add(back_color);
	return win;
}

exports.createEventDetailsWindow = function(edesc, eloc, edetail, etime) {
		var win = mcps.ui.createBaseWindow(edesc);
		
		var label = Ti.UI.createLabel({
			text: edesc,
			top: '5%',
			textAlign:'center',
			color: '#FFF',
			font:{fontSize:30}
		});
		var time = Ti.UI.createLabel({
			text: etime,
			textAlign:'center',
			top: '17%',
			color: '#FFF',
			font:{fontSize:24}
		});
		var place = Ti.UI.createLabel({
			text: eloc,
			textAlign:'center',
			top: '30%',
			color: '#FFF',
			font:{fontSize:26}
		});
		var desc = Ti.UI.createLabel({
			text: edetail,
			top:3,
			bottom:3,
			width:'90%',
			textAlign:'center',
			color: '#FFF',
			font:{fontSize:24},
			zIndex:1,
			autoLink: Ti.UI.Android.LINKIFY_ALL
		});

		var back_color =Ti.UI.createView({
			top: '50%',
			bottom:'5%',
			width:'95%',
			textAlign: 'center',
			backgroundColor: '#000000',
			opacity:0.6,
			borderRadius: 6,			
			borderColor:'ffe512',
			borderWidth:4,
			zIndex:0,
			font:{fontSize:22}
	});
		var large_win = Ti.UI.createView({
			height:'60%',
			width:'95%',
			backgroundColor: '#050',
			opacity:0.4,
			borderRadius: 8
		});
		win.add(large_win);
			
		var back = mcps.ui.createBackButton();
		back.setBottom('15%'); back.setLeft('20%');
		
		var share = mcps.fb.createShareButton(edesc);
		share.setBottom('15%'); share.setRight('20%');
		
		large_win.add(label);
		large_win.add(time);
		large_win.add(place);
		back_color.add(desc);
		large_win.add(back_color);		
		
		win.add(back);
		win.add(share);
		win.add(large_win);
		

		return win;
}
