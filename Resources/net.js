var mcps = {};
mcps.details = require('details');

exports.getParkData = function(e) {
	var url = "http://api.milwaukeecounty.org/MobileAPI.svc/RSSInfo/parks";
	var tableData = [];
	var table = Ti.UI.createTableView();
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			
			json = JSON.parse(this.responseText);
			for(var i = 0; i < json.length; i++) {
				var park = json[i];
				var row = Ti.UI.createTableViewRow({
					height:'60dp',
					pTitle: park.title,
					pLink: park.link,
					pDesc: park.description
				});
				var title = Ti.UI.createLabel({
					text:park.title,
					color: '#FFF'
				});
				
				row.add(title);
				
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
			var plink = e.rowData.pLink;
			var pdesc = e.rowData.pDesc;
			var ptitle = e.rowData.pTitle;
			var win = mcps.details.createParkDetailsWindow(plink, pdesc, ptitle);
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
					eDesc:evnt.description,
					eLocation:evnt.location,
					eDetails:evnt.moredetail,
					eTime:evnt.time
				});
				var title = Ti.UI.createLabel({
					text: evnt.description,
					color: '#FFF',
					left: 0
				});
				
				var dt = evnt.time.split(' ');
				var d = dt[0].split('/');
				var t = dt[1].split(':');
				
				var date = d[0] + "/" + d[1];
				var time = t[0] + ":" + t[1] + " " + dt[2];
				
				var dtf = date + "\n" + time;
				
				var datetime = Ti.UI.createLabel({
					text: dtf,
					color: '#FFF',
					right: 0,
					font: {fontSize: 12}
				});
				
				
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
