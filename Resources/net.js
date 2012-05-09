var mcps = {};
mcps.details = require('details');

/* Start Parks/Events detail windows */
exports.getParkData = function(e) {
	var url = "http://api.milwaukeecounty.org/MobileAPI.svc/ParksInfo";
	var tableData = [];
	var table = Ti.UI.createTableView();
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			json = JSON.parse(this.responseText);
			for(var i = 0; i < json.features.length; i++) {
				var park = json.features[i].attributes;
				var row = Ti.UI.createTableViewRow({
					height:'60dp',
					pName: park.NAME,
					pAddr: park.ADDRESS,
					pLat: parseFloat(park.Lat),
					pLon: parseFloat(park.Lon),
					backgroundColor: '#050',
					layout:'vertical',
					opacity:0.6
				});
				var arrow = Ti.UI.createView({
					image:'/images/Arrow.png',
					left:'80%'
					
				});

				var title = Ti.UI.createLabel({
					text:park.NAME,
					textAlign:'center',
					font:{fontSize:36},
					top:'23%',
					color:'#FFF'
				});
				
				row.add(title);
				row.add(arrow);
				tableData.push(row);
			}
			table.setData(tableData);
		},
		onerror: function(e) {
			Ti.API.debug(e.error);
			alert('There was an error retrieving parks data. Please try again.');
		},
		timeout: 5000
	});
	
	xhr.open("GET", url);
	xhr.send();
	
	table.addEventListener('click', function(e) {
		if(e.rowData) {
			var data = {
				name: e.rowData.pName,
				addr: e.rowData.pAddr,
				lat: e.rowData.pLat,
				lon: e.rowData.pLon
			};	

			var win = mcps.details.createParkDetailsWindow(data);
			win.open();
		}
	});
	
	return table;
}

exports.getEventData = function(e, numdays) {
	var url = "http://api.milwaukeecounty.org/MobileAPI.svc/Events/parks/";
	var days = 0;
	!numdays ? days=7 : days=numdays;
	url += days;
	var tableData = [];
	var table = Ti.UI.createTableView();
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			json = JSON.parse(this.responseText);
			for(var i = 0; i < json.length; i++) {
				var evnt = json[i];
				var row = Ti.UI.createTableViewRow({
					height:'60dp',
					backgroundColor: '#050',
					layout:'vertical',
					opacity:0.6,
					eDesc:evnt.description,
					eLocation:evnt.location,
					eDetails:evnt.moredetail,
					eTime:evnt.time
				});
					
				var arrow = Ti.UI.createImageView({
					image:'/images/Arrow.png',
					left:'80%'
					
				});
				var title = Ti.UI.createLabel({
					text: evnt.description,
					font:{fontSize:16},
					left:0,
					color:'#FFF'
				});
				
				var dt = evnt.time.split(' ');
				var d = dt[0].split('/');
				var t = dt[1].split(':');
				
				var date = d[0] + "/" + d[1];
				var time = t[0] + ":" + t[1] + " " + dt[2];
				
				var dtf = date + " " + time;
				
				var datetime = Ti.UI.createLabel({
					text: dtf,
					color: '#FFF',
					right: '5%',
					font: {fontSize: 24}

				});
				
				row.add(arrow);
				row.add(title);
				row.add(datetime);
				tableData.push(row);
			} //end for loop
			
			table.setData(tableData);
		},
		onerror: function(e) {
			Ti.API.debug(e.error);
			alert('There was an error retrieving events data. Please try again.');
		},
		timeout: 5000		
	});
	xhr.open("GET", url)
	xhr.send();

	table.addEventListener('click', function(e) {
		if(e.rowData) {
			var edesc = e.rowData.eDesc;
			var eloc = e.rowData.eLocation;
			var edetail = e.rowData.eDetails;
			var etime = e.rowData.eTime;
			var win = mcps.details.createEventDetailsWindow(edesc, eloc, edetail, etime);
			win.open();
		}
	});
		
	return table;
}
