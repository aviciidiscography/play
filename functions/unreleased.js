
function getUnreleased(i){
	var data = UNRELEASED[i];
	var title = data[1];
	var version = data[2];
	var featurings = data[3];
	var alias=getAlias(data[4]);
	var date = data[5]
	var yt = "";
	var drive = "";
	var artists = [];
	
	if (date!=null){
		date = date.toString().slice(-4);
	}
	
	
	if (featurings!=null){
		featurings = featurings.toString().split(",");
		for (var j=0; j<featurings.length; j++){
			artists.push(getArtist(featurings[j]));
		}
	}
	
	if (data[7]!=null){
		yt = "<img class=\"icon\" onclick=playYouTube("+i+") src=\"UI/youtube.png\">"
	}

	if (data[6]!=null){
		drive = "<img class=\"icon\" onclick=playGoogleDrive("+i+") src=\"UI/drive.png\">"	}


	return [title, version, artists.join(", "), date, alias, yt, drive];
}

function loadUnreleased(){
	var unreleased = []
	for (var i=0; i<UNRELEASED.length; i++){
		unreleased.push(getUnreleased(i));
	}
	return unreleased;
}

function unreleasedtable(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Title');
	data.addColumn('string', 'Version');
	data.addColumn('string', 'Featuring');
	data.addColumn('string', 'Year');
	data.addColumn('string', 'Alias');
	data.addColumn('string', 'YouTube');
	data.addColumn('string', 'Drive');
	data.addRows(loadUnreleased());

	var table = new google.visualization.Table(document.getElementById('content'));

	table.draw(data, tableconfig);
}